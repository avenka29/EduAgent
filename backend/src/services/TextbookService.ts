import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';

export class TextbookService {
  private repoPath: string;
  private titleCache: Map<string, string> = new Map();

  constructor() {
    this.repoPath = path.join(__dirname, '../../../ingestor/content_repo');
  }

  async listTextbooks() {
    const collPath = path.join(this.repoPath, 'collections');
    const files = await fs.readdir(collPath);
    
    return Promise.all(
      files.filter(f => f.endsWith('.xml')).map(async (file) => {
        const slug = file.replace('.collection.xml', '');
        const content = await fs.readFile(path.join(collPath, file), 'utf-8');
        const dom = new JSDOM(content, { contentType: 'text/xml' });
        const title = dom.window.document.querySelector('md\\:title, title')?.textContent || slug;
        
        let coverUrl = `/api/textbook/media/${slug}-cover.jpg`;
        try {
          await fs.access(path.join(this.repoPath, 'cover', `${slug}-cover.jpg`));
        } catch {
          coverUrl = 'https://images.unsplash.com/photo-1543005128-d1b170452fd0?auto=format&fit=crop&q=80&w=400';
        }

        return { id: slug, title, slug, coverUrl, description: "Comprehensive OpenStax curriculum." };
      })
    );
  }

  async getTOC(bookSlug: string) {
    const tocPath = path.join(this.repoPath, 'collections', `${bookSlug}.collection.xml`);
    const xml = await fs.readFile(tocPath, 'utf-8');
    const dom = new JSDOM(xml, { contentType: 'text/xml' });
    const doc = dom.window.document;
    const contentRoot = doc.querySelector('col\\:content, content');
    if (!contentRoot) return [];

    const fetchTasks = Array.from(contentRoot.children).map(async (child) => {
      const tagName = child.tagName.toLowerCase();
      if (tagName.includes('module')) {
        const id = child.getAttribute('document');
        return id ? { type: 'module', id, title: await this.getFastTitle(id) } : null;
      } else if (tagName.includes('subcollection')) {
        const title = child.querySelector('md\\:title, title')?.textContent || 'Chapter';
        const mods = await Promise.all(Array.from(child.querySelectorAll('col\\:module, module')).map(async (m) => {
          const mid = m.getAttribute('document');
          return mid ? { id: mid, title: await this.getFastTitle(mid) } : null;
        }));
        return { type: 'chapter', title, modules: mods.filter(m => m !== null) };
      }
      return null;
    });

    const results = await Promise.all(fetchTasks);
    return results.filter(r => r !== null);
  }

  private async getFastTitle(id: string): Promise<string> {
    if (this.titleCache.has(id)) return this.titleCache.get(id)!;
    try {
      const p = path.join(this.repoPath, 'modules', id, 'index.cnxml');
      const xml = await fs.readFile(p, 'utf-8');
      const match = xml.match(/<(?:md:)?title>(.*?)<\/(?:md:)?title>/);
      const title = match ? match[1].trim() : `Section ${id}`;
      this.titleCache.set(id, title);
      return title;
    } catch {
      return `Section ${id}`;
    }
  }

  async getModule(moduleId: string) {
    const modPath = path.join(this.repoPath, 'modules', moduleId, 'index.cnxml');
    const xml = await fs.readFile(modPath, 'utf-8');
    const dom = new JSDOM(xml, { contentType: 'text/xml' });
    const doc = dom.window.document;
    const title = doc.querySelector('md\\:title, title')?.textContent || 'Lesson';
    const content = doc.querySelector('content');
    if (!content) return { title, html: '<p>No content found.</p>' };

    this.transformNode(content, doc);
    return { title, html: content.innerHTML };
  }

  private mathmlToLatex(node: Element): string {
    const tagName = node.tagName.toLowerCase().replace(/.*:/, '');
    
    switch (tagName) {
      case 'math':
        return Array.from(node.children).map(c => this.mathmlToLatex(c as Element)).join('');
      case 'mrow':
        return Array.from(node.children).map(c => this.mathmlToLatex(c as Element)).join('');
      case 'mi':
      case 'mn':
      case 'mtext':
        return node.textContent || '';
      case 'mo':
        const op = node.textContent?.trim() || '';
        const opMap: any = { '−': '-', '·': '\\cdot ', '×': '\\times ', 'π': '\\pi ', '∞': '\\infty ' };
        return opMap[op] || op;
      case 'mfrac':
        const num = node.children[0] ? this.mathmlToLatex(node.children[0] as Element) : '';
        const den = node.children[1] ? this.mathmlToLatex(node.children[1] as Element) : '';
        return `\\frac{${num}}{${den}}`;
      case 'msup':
        const baseSup = node.children[0] ? this.mathmlToLatex(node.children[0] as Element) : '';
        const sup = node.children[1] ? this.mathmlToLatex(node.children[1] as Element) : '';
        return `${baseSup}^{${sup}}`;
      case 'msub':
        const baseSub = node.children[0] ? this.mathmlToLatex(node.children[0] as Element) : '';
        const sub = node.children[1] ? this.mathmlToLatex(node.children[1] as Element) : '';
        return `${baseSub}_{${sub}}`;
      case 'msqrt':
        return `\\sqrt{${Array.from(node.children).map(c => this.mathmlToLatex(c as Element)).join('')}}`;
      case 'mroot':
        const baseRoot = node.children[0] ? this.mathmlToLatex(node.children[0] as Element) : '';
        const index = node.children[1] ? this.mathmlToLatex(node.children[1] as Element) : '';
        return `\\sqrt[${index}]{${baseRoot}}`;
      default:
        return Array.from(node.children).map(c => this.mathmlToLatex(c as Element)).join('');
    }
  }

  private transformNode(root: Element, doc: Document) {
    // 1. Strip Noise
    const noise = ['coreq-skills', 'learning-objectives', 'metadata'];
    noise.forEach(cls => root.querySelectorAll(`.${cls}, ${cls}`).forEach(el => el.remove()));

    // 2. Transform MathML to LaTeX DELIMITERS (Must happen before general tag mapping)
    const mathNodes = Array.from(root.querySelectorAll('math, m\\:math'));
    mathNodes.forEach(math => {
      const isDisplay = math.getAttribute('display') === 'block';
      const latex = this.mathmlToLatex(math);
      const replacement = doc.createTextNode(isDisplay ? `\\[ ${latex} \\]` : `\\( ${latex} \\)`);
      math.replaceWith(replacement);
    });

    // 3. Transform Images
    root.querySelectorAll('image').forEach(img => {
      const src = img.getAttribute('src')?.split('/').pop() || '';
      const newImg = doc.createElement('img');
      newImg.src = `http://localhost:4000/api/textbook/media/${src}`;
      newImg.className = 'os-image';
      img.replaceWith(newImg);
    });

    // 4. Transform Multiple Choice
    root.querySelectorAll('list').forEach(list => {
      const isMC = list.classList.contains('circled') || list.querySelector('.token');
      if (isMC) {
        const container = doc.createElement('div');
        container.className = 'os-mc-container';
        list.querySelectorAll('item').forEach(item => {
          const card = doc.createElement('div');
          card.className = 'os-choice-card group';
          const token = item.querySelector('.token');
          let label = token?.textContent?.trim() || '•';
          const tokenMap: any = { 'ⓐ': 'A', 'ⓑ': 'B', 'ⓒ': 'C', 'ⓓ': 'D', 'ⓔ': 'E' };
          label = tokenMap[label] || label;
          token?.remove();
          card.innerHTML = `<div class="os-choice-label">${label}</div><div class="os-choice-content">${item.innerHTML}</div>`;
          container.appendChild(card);
        });
        list.replaceWith(container);
      }
    });

    // 5. Mapping
    const mappings: Record<string, { tag: string, class: string }> = {
      'para': { tag: 'p', class: 'os-para' },
      'title': { tag: 'h3', class: 'os-title' },
      'section': { tag: 'section', class: 'os-section' },
      'example': { tag: 'div', class: 'os-example' },
      'exercise': { tag: 'div', class: 'os-exercise' },
      'problem': { tag: 'div', class: 'os-problem' },
      'solution': { tag: 'div', class: 'os-solution' },
      'note': { tag: 'div', class: 'os-note' },
      'term': { tag: 'strong', class: 'os-term' },
      'equation': { tag: 'div', class: 'os-equation' }
    };

    Object.entries(mappings).forEach(([oldTag, config]) => {
      root.querySelectorAll(oldTag).forEach(el => {
        const replacement = doc.createElement(config.tag);
        replacement.className = config.class;
        while (el.firstChild) replacement.appendChild(el.firstChild);
        Array.from(el.attributes).forEach(attr => {
          if (attr.name !== 'xmlns' && attr.name !== 'class') replacement.setAttribute(attr.name, attr.value);
        });
        el.replaceWith(replacement);
      });
    });
  }

  async getImagePath(filename: string) {
    let fullPath = path.join(this.repoPath, 'media', filename);
    if (filename.includes('cover')) fullPath = path.join(this.repoPath, 'cover', filename);
    try {
      await fs.access(fullPath);
      return fullPath;
    } catch {
      const altPath = path.join(this.repoPath, 'media', filename.replace(/\./g, '_'));
      try { await fs.access(altPath); return altPath; } catch { return null; }
    }
  }
}

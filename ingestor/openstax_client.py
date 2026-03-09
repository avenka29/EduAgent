import os
import re
from bs4 import BeautifulSoup

class LocalOpenStaxClient:
    """Enhanced client that properly parses OpenStax collections and modules."""
    
    def __init__(self, repo_path, book_slug="college-algebra-2e"):
        self.repo_path = repo_path
        self.book_slug = book_slug

    def fetch_toc(self):
        """Reads the TOC from the local collection.xml."""
        toc_path = os.path.join(self.repo_path, "collections", f"{self.book_slug}.collection.xml")
        if not os.path.exists(toc_path):
            raise FileNotFoundError(f"TOC not found at {toc_path}")
            
        with open(toc_path, "r", encoding="utf-8") as f:
            content = f.read()
            return self.parse_collection(content)

    def parse_collection(self, xml_content):
        soup = BeautifulSoup(xml_content, "xml")
        title_tag = soup.find(["md:title", "title"])
        book_title = title_tag.text if title_tag else self.book_slug
        
        content_root = soup.find(["col:content", "content"])
        if not content_root:
            return {"id": self.book_slug, "title": book_title, "tree": []}

        # Recursively parse the structure
        tree = self._parse_contents(content_root)
        
        return {
            "id": self.book_slug,
            "title": book_title,
            "tree": tree
        }

    def _parse_contents(self, parent_element):
        items = []
        for child in parent_element.find_all(["col:module", "module", "col:subcollection", "subcollection"], recursive=False):
            tag_name = child.name.lower()
            
            if "module" in tag_name:
                mod_id = child.get("document")
                if mod_id:
                    title = self.get_module_title(mod_id)
                    # Filter out non-curriculum sections (intro surveys etc)
                    if self._is_curriculum(title):
                        items.append({
                            "id": mod_id,
                            "title": title,
                            "type": "LESSON"
                        })
            elif "subcollection" in tag_name:
                title_tag = child.find(["md:title", "title"])
                title = title_tag.text if title_tag else "Chapter"
                
                # Filter out introductory chapters like "Preface" etc if needed
                if self._is_curriculum(title):
                    inner_content = child.find(["col:content", "content"])
                    sub_items = self._parse_contents(inner_content) if inner_content else []
                    
                    if sub_items:
                        items.append({
                            "id": title.lower().replace(" ", "-"),
                            "title": title,
                            "type": "CHAPTER",
                            "contents": sub_items
                        })
        return items

    def _is_curriculum(self, title):
        """Filters out non-essential pedagogical noise."""
        noise = ["preface", "acknowledgments", "about our team", "introductory survey", "corequisite skills"]
        t = title.lower()
        return not any(n in t for n in noise)

    def get_module_title(self, module_id):
        """Fast extraction of module title."""
        try:
            p = os.path.join(self.repo_path, "modules", module_id, "index.cnxml")
            with open(p, "r", encoding="utf-8") as f:
                content = f.read()
                match = re.search(r'<(?:md:)?title>(.*?)</(?:md:)?title>', content)
                return match.group(1).strip() if match else f"Section {module_id}"
        except:
            return f"Section {module_id}"

    def fetch_page_content(self, module_id):
        """Fetches and cleans module content."""
        p = os.path.join(self.repo_path, "modules", module_id, "index.cnxml")
        if not os.path.exists(p): return "Untitled", ""
        
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()
            # We already have a good transformation logic in the backend, 
            # for the ingestor we mainly care about the graph and core text.
            return self.get_module_title(module_id), content

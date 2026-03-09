import fs from 'fs/promises';
import path from 'path';
import { ICourseProvider } from '../core/ICourseProvider';
import { CourseNode, CourseEdge, GraphData } from '../core/types';

export class LocalJSONProvider implements ICourseProvider {
  private dataPath: string;
  private cache: GraphData | null = null;

  constructor() {
    // In compiled JS, this will be in dist/services
    this.dataPath = path.join(__dirname, '../../data/course_graph.json');
  }

  private async loadData(): Promise<GraphData> {
    if (this.cache) return this.cache;
    const raw = await fs.readFile(this.dataPath, 'utf-8');
    this.cache = JSON.parse(raw);
    return this.cache!;
  }

  async getTOC(): Promise<CourseNode[]> {
    const data = await this.loadData();
    const nodes = data.nodes;
    const edges = data.edges;

    // 1. Find the Module (Root)
    const moduleNode = nodes.find(n => n.type === 'MODULE');
    if (!moduleNode) return [];

    // 2. Recursively build hierarchy based on CONTAINS edges
    return [this.buildHierarchy(moduleNode, nodes, edges)];
  }

  private buildHierarchy(current: CourseNode, allNodes: CourseNode[], edges: CourseEdge[]): CourseNode {
    const childrenIds = edges
      .filter(e => e.from === current.id && e.type === 'CONTAINS')
      .map(e => e.to);

    const children = allNodes
      .filter(n => childrenIds.includes(n.id))
      .map(n => this.buildHierarchy(n, allNodes, edges));

    // Use metadata.uuid as the id for the frontend to avoid '#' issues
    const { content, ...nodeWithoutContent } = current;
    return {
      ...nodeWithoutContent,
      id: current.metadata.uuid, 
      children: children.length > 0 ? children : undefined
    } as CourseNode;
  }

  async getNodeContent(nodeId: string): Promise<CourseNode | null> {
    const data = await this.loadData();
    const node = data.nodes.find(n => n.id === nodeId || n.metadata.uuid === nodeId);
    return node || null;
  }
}

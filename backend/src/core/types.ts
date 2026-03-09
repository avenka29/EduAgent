export interface CourseNode {
  id: string;
  title: string;
  type: 'MODULE' | 'CHAPTER' | 'LESSON' | 'EXERCISE';
  content?: string;
  metadata: {
    uuid: string;
    slug?: string;
    version?: string;
    license?: string;
  };
  children?: CourseNode[];
}

export interface CourseEdge {
  from: string;
  to: string;
  type: 'CONTAINS' | 'NEXT_STEP' | 'PREREQUISITE_FOR' | 'ALIGNED_TO';
}

export interface GraphData {
  nodes: CourseNode[];
  edges: CourseEdge[];
}

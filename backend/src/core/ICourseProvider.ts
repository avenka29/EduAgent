import { CourseNode } from './types';

export interface ICourseProvider {
  getTOC(): Promise<CourseNode[]>;
  getNodeContent(nodeId: string): Promise<CourseNode | null>;
  // Future methods:
  // getPrerequisites(nodeId: string): Promise<CourseNode[]>;
}

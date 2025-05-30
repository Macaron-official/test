// Instructions: Extend task interface to include detailed properties for the expanded view

export interface Task {
  id: number;
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  assignees: string[];
  startDate: string;
  endDate?: string;
  priority?: 'low' | 'medium' | 'high';
  overview?: string;
  project?: string;
  tags?: string[];
  attachments?: TaskAttachment[];
  moreProperties?: Record<string, string | number | boolean>;
}

export interface TaskAttachment {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'image' | 'other';
  size: string;
  url?: string;
  lastModified?: string;
}

export interface TaskViewProps {
  tasks: Task[];
  viewMode: 'by-project' | 'all-tasks' | 'timeline';
}

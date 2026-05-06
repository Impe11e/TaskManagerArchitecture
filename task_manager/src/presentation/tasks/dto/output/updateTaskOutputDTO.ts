export interface UpdateTaskOutputDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  createdAt: Date;
}

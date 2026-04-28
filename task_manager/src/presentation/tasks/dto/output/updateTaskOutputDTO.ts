export interface UpdateTaskOutputDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | Date;
  updatedAt: string | Date;
}

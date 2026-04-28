export interface CreateTaskOutputDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TaskModelProps {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  priority?: string;
  dueDate?: string | Date | null;
}

export class TaskModel implements TaskModelProps {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  createdAt?: Date;
  priority?: string;
  dueDate?: Date | null;

  constructor(props: TaskModelProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.priority = props.priority;
    if (typeof props.dueDate === 'string') {
      this.dueDate = props.dueDate ? new Date(props.dueDate) : null;
    } else {
      this.dueDate = props.dueDate ?? null;
    }
  }
}

import type { TaskEntity } from '../../../domain/tasks/entities/taskEntity';


class TaskCreatedEvent {
    public readonly operation: string;
    public readonly entityId: number;
    public readonly payload: any;
    public readonly occurredAt: Date;

    constructor(task: TaskEntity) {
        this.operation = "Task Created";
        this.entityId = task.id!;
        this.payload = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate
        };
        this.occurredAt = new Date();
    }
}

export default TaskCreatedEvent;

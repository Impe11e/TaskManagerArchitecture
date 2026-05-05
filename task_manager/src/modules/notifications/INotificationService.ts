import type TaskCreatedEvent from '../../application/tasks/events/created';
import type TaskUpdatedEvent from '../../application/tasks/events/updated';

export interface INotificationService {
    notifyTaskCreated(event: TaskCreatedEvent): Promise<void> | void;
    notifyTaskUpdated(event: TaskUpdatedEvent): Promise<void> | void;
    notifyTaskDeleted?(taskId: number): Promise<void> | void;
}

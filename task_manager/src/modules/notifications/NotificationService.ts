import type { INotificationService } from './INotificationService';
import type TaskCreatedEvent from '../../application/tasks/events/created';
import type TaskUpdatedEvent from '../../application/tasks/events/updated';

class NotificationService implements INotificationService {
    notifyTaskCreated(event: TaskCreatedEvent): void {
        console.log(`Task created: ${event.payload.title} (ID: ${event.entityId}) at ${event.occurredAt}`);
    }
    notifyTaskUpdated(event: TaskUpdatedEvent): void {
        console.log(`Task updated: ${event.payload.title} (ID: ${event.entityId}) at ${event.occurredAt}`);
    }
    notifyTaskDeleted(taskId: number): void {
        console.log(`Task deleted: ID ${taskId}`);
    }
}

export default NotificationService;

import type TaskCreatedEvent from '../../application/tasks/events/created';
import type TaskUpdatedEvent from '../../application/tasks/events/updated';
import type { INotificationService } from './INotificationService';

class NotificationSubscriber {
    private notificationService: INotificationService;

    constructor(notificationService: INotificationService) {
        this.notificationService = notificationService;
    }

    handleTaskCreated(event: TaskCreatedEvent): void {
        this.notificationService.notifyTaskCreated(event);
    }
    handleTaskUpdated(event: TaskUpdatedEvent): void {
        this.notificationService.notifyTaskUpdated(event);
    }
}

export default NotificationSubscriber;

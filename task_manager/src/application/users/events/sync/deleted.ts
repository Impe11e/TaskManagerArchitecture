import type {TUserEntity} from "../../../../domain/users/domainRequires/repo/TUserEntity.js";

class EventUserDeleted {
    public readonly operation: string;
    public readonly entityId: number;
    public readonly payload: any;
    public readonly occurredAt: Date

    constructor(public user: TUserEntity) {
        this.operation = "User Deleted"
        this.entityId = user.id.value
        this.payload = {
            username: user.username.value,
            email: user.email.value
        }
        this.occurredAt = new Date()
    }
}

export default EventUserDeleted;
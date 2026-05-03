import type {TUserEntity} from "../../../domain/users/domainRequires/repo/TUserEntity.js";

class EventUserUpdated {
    public readonly operation: string;
    public readonly entityId: number;
    public readonly payload: any;
    public readonly occurredAt: Date

    constructor(public newUser: TUserEntity, public oldUser: TUserEntity) {
        this.operation = "User Updated";
        this.entityId = newUser.id.value
        this.payload = {
            currentData: {
                userId: newUser.id.value,
                username: newUser.username.value,
                email: newUser.email.value,
            },
            oldData: {
                userId: oldUser.id.value,
                username: oldUser.username.value,
                email: oldUser.email.value,
            }
        }
        this.occurredAt = new Date()
    }
}

export default EventUserUpdated;
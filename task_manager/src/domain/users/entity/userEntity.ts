import Email from "../valueObjects/emailObj.js";
import Username from "../valueObjects/usernameObj.js";
import Id from "../valueObjects/idObj.js";
import Password from "../valueObjects/passwordObj.js";

type UpdateObjType = {
    username: Username | undefined,
    email: Email | undefined,
    password: Password | undefined,
}

class UserEntity {
    public id: Id;
    public email: Email;
    public username: Username;
    public password: Password;

    constructor(id: Id, username: Username, email: Email, password: Password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public update({username, email, password}: UpdateObjType): void {
        if (username !== undefined) {
            this.username = username;
        }

        if (email !== undefined) {
            this.email = email;
        }

        if (password !== undefined) {
            this.password = password;
        }
    }
}

export default UserEntity;
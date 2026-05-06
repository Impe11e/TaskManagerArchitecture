import Email from "../valueObjects/emailObj.js";
import Username from "../valueObjects/usernameObj.js";
import Password from "../valueObjects/passwordObj.js";

class NewUserEntity {
    public email: Email;
    public username: Username;
    public password: Password;

    constructor(username: Username, email: Email, password: Password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

export default NewUserEntity;
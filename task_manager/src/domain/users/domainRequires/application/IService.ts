import Email from "../../valueObjects/emailObj.js";
import Username from "../../valueObjects/usernameObj.js";

export interface IService {
    checkByEmail(email: Email): Promise<void>
    checkByUsername(username: Username): Promise<void>
}
import Phone from "../valueObjects/phoneObj.js";
import Id from "../valueObjects/idObj.js";

class NewProfileEntity {
  constructor(
    public readonly userId: Id,
    public readonly phone: Phone,
    public readonly bio: string,
  ) {}
}

export default NewProfileEntity;

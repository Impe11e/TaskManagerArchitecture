import profileService from "../useCases/profileService.js";
//import {ValidationError} from "../errors/customErrors.js";
import handle from "../errors/errorHandler.js";

class ProfileController {
  constructor(service) {
    this.service = service;
  }

  create(data) {
    try {
      const profile = this.service.create(data);
      return { status: 201, data: profile };
    } catch (err) {
      return handle(err)
    }
  }

  update(id, data) {
    try {
      id = parseInt(id);
      const profile = this.service.update(id, data);
      return { status: 200, data: profile };
    } catch (err) {
      return handle(err)
    }
  }

  findById(id) {
    try {
      id = parseInt(id);
      const profile = this.service.findById(id);
      return { status: 200, data: profile };
    } catch (err) {
      return handle(err)
    }
  }

  deleteById(id) {
    try {
      id = parseInt(id);
      this.service.deleteById(id);
      return { status: 204, data: null };
    } catch (err) {
      return handle(err)
    }
  }
}

export default new ProfileController(profileService);

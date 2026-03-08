import profileService from "../services/profileService.js";

class ProfileController {
  constructor(service) {
    this.service = service;
  }

  create(data) {
    try {
      const profile = this.service.create(data);
      return { status: 201, data: profile };
    } catch (err) {
      return { status: 400, data: err.message };
    }
  }

  update(id, data) {
    try {
      id = parseInt(id);
      const profile = this.service.update(id, data);
      return { status: 200, data: profile };
    } catch (err) {
      return { status: 404, data: err.message };
    }
  }

  findById(id) {
    try {
      id = parseInt(id);
      const profile = this.service.findById(id);
      return { status: 200, data: profile };
    } catch (err) {
      return { status: 400, data: err.message };
    }
  }

  deleteById(id) {
    try {
      id = parseInt(id);
      this.service.deleteById(id);
      return { status: 204, data: null };
    } catch (err) {
      return { status: 404, data: err.message };
    }
  }
}

export default new ProfileController(profileService);

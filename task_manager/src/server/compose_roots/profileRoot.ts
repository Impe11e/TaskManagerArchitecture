// infrastructure
import pool from "../../infrastructure/pool.js";
import ProfileRepository from "../../infrastructure/profiles/repository/profileRepo.js";

const profileRepository = new ProfileRepository(pool);

// domain
import ProfilesFactory from "../../domain/profiles/factory/profilesFactory.js";
import ProfilesDomainService from "../../domain/profiles/service/profilesDomainService.js";

const profilesDomainService = new ProfilesDomainService(profileRepository);

// application (handlers)
import CreateProfileHandler from "../../application/profiles/commandHandlers/createProfile.js";
import UpdateProfileCommandHandler from "../../application/profiles/commandHandlers/updateProfile.js";
import FindProfileQueryHandler from "../../application/profiles/queryHandlers/findProfileById.js";
import DeleteProfileCommandHandler from "../../application/profiles/commandHandlers/deleteProfileById.js";

const createProfile = new CreateProfileHandler(
  profileRepository,
  ProfilesFactory,
  profilesDomainService,
);
const updateProfile = new UpdateProfileCommandHandler(profileRepository);
const findProfileById = new FindProfileQueryHandler(profileRepository);
const deleteProfileById = new DeleteProfileCommandHandler(profileRepository);

// controller (presentation)
import ProfileController from "../../presentation/profiles/controller/profileController.js";

const profileController = new ProfileController(
  createProfile,
  updateProfile,
  findProfileById,
  deleteProfileById,
);

export default { profileController };

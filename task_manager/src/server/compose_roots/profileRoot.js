// infrastructure
import pool from "../../infrastructure/pool.js";
import ProfileRepository from "../../infrastructure/profiles/repository/profileRepo.js";

const profileRepository = new ProfileRepository(pool);

// domain
import ProfilesFabric from "../../domain/profiles/fabrics/profilesFabric.js";
import ProfilesDomainService from "../../domain/profiles/service/profilesDomainService.js";

const profilesDomainService = new ProfilesDomainService(profileRepository);

// application
import CreateProfile from "../../application/profiles/useCases/createProfile.js";
import DeleteProfileById from "../../application/profiles/useCases/deleteProfileById.js";
import FindProfileById from "../../application/profiles/useCases/findProfileById.js";
import UpdateProfile from "../../application/profiles/useCases/updateProfile.js";

const createProfile = new CreateProfile(
  profileRepository,
  ProfilesFabric,
  profilesDomainService,
);
const updateProfile = new UpdateProfile(profileRepository);
const findProfileById = new FindProfileById(profileRepository);
const deleteProfileById = new DeleteProfileById(profileRepository);

// presentation
import ProfileController from "../../presentation/profiles/controller/profileController.js";

const profileController = new ProfileController(
  createProfile,
  updateProfile,
  findProfileById,
  deleteProfileById,
);

export default { profileController };

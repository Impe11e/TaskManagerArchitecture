// eventBus
import EventBus from "../../modules/eventBus/eventBus.js";
import type { TAuditEvent } from "../../modules/audit/events/IAuditEvent.js";

const eventBus = new EventBus();

// infrastructure
import pool from "../../infrastructure/pool.js";
import ProfileRepository from "../../infrastructure/profiles/repository/profileRepo.js";

const profileRepository = new ProfileRepository(pool);

// domain
import ProfilesDomainService from "../../domain/profiles/service/profilesDomainService.js";
import ProfilesFactory from "../../domain/profiles/factory/profilesFactory.js";

const profilesDomainService = new ProfilesDomainService(profileRepository);

const profilesFactory = new ProfilesFactory(profilesDomainService);

// application
import CreateProfileHandler from "../../application/profiles/commandHandlers/createProfile.js";
import DeleteProfileById from "../../application/profiles/commandHandlers/deleteProfileById.js";
import FindProfileQueryHandler from "../../application/profiles/queryHandlers/findProfileById.js";
import UpdateProfileCommandHandler from "../../application/profiles/commandHandlers/updateProfile.js";
import AuditService from "../../modules/audit/auditService.js";
import AuditSubscriber from "../../modules/audit/auditSubscriber.js";

const auditService = new AuditService();

// subscriptions
const auditSubscriber = new AuditSubscriber(auditService);
eventBus.subscribe("ProfileCreated", (event: TAuditEvent) =>
  auditSubscriber.handle(event),
);
eventBus.subscribe("ProfileUpdated", (event: TAuditEvent) =>
  auditSubscriber.handle(event),
);

const createProfile = new CreateProfileHandler(
  profileRepository,
  profilesFactory,
  eventBus,
);
const updateProfile = new UpdateProfileCommandHandler(
  profileRepository,
  profilesDomainService,
  eventBus,
);
const findProfileById = new FindProfileQueryHandler(profileRepository);
const deleteProfileById = new DeleteProfileById(
  profileRepository,
  auditService,
);

// controller
import ProfilesController from "../../presentation/profiles/controller/profilesController.js";

const profilesController = new ProfilesController(
  createProfile,
  updateProfile,
  findProfileById,
  deleteProfileById,
);

export default { profilesController };

import InMemoryProfilesRepository from "../profileRepoMock.js";
import CreateProfileCommandHandler from "../../../../dist/application/profiles/commandHandlers/createProfile.js";
import DeleteProfileCommandHandler from "../../../../dist/application/profiles/commandHandlers/deleteProfileById.js";
import FindProfileQueryHandler from "../../../../dist/application/profiles/queryHandlers/findProfileById.js";
import UpdateProfileCommandHandler from "../../../../dist/application/profiles/commandHandlers/updateProfile.js";
import ProfilesFactory from "../../../../dist/domain/profiles/factory/profilesFactory.js";
import ProfilesDomainService from "../../../../dist/domain/profiles/service/profilesDomainService.js";
import eventBusMock from "../eventBusMock.js";
import auditServiceMock from "../auditServiceMock.js";

describe("Profiles Application Tests", () => {
  const VALID_PHONE = "+380991112233";

  test("Should create profile", async () => {
    const repo = new InMemoryProfilesRepository();
    const service = new ProfilesDomainService(repo);
    const factory = new ProfilesFactory(service);

    const createHandler = new CreateProfileCommandHandler(
      repo,
      factory,
      eventBusMock,
    );
    const findHandler = new FindProfileQueryHandler(repo);

    const result = await createHandler.handle({
      userId: 1,
      phone: VALID_PHONE,
      bio: "test",
    });
    const profile = await findHandler.handle({ id: 1 });

    expect(result.id).toBe(1);
    expect(profile.phone.value).toBe(VALID_PHONE);
  });

  test("Should delete profile", async () => {
    const repo = new InMemoryProfilesRepository();
    const service = new ProfilesDomainService(repo);
    const factory = new ProfilesFactory(service);
    const createHandler = new CreateProfileCommandHandler(
      repo,
      factory,
      eventBusMock,
    );
    const deleteHandler = new DeleteProfileCommandHandler(
      repo,
      auditServiceMock,
    );

    await createHandler.handle({ userId: 1, phone: VALID_PHONE, bio: "test" });
    const isDeleted = await deleteHandler.handle({ id: 1 });

    expect(isDeleted).toBe(true);
  });
});

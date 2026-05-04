import InMemoryProfilesRepository from "../profileRepoMock.js";
import CreateProfileCommandHandler from "../../../../dist/application/profiles/commandHandlers/createProfile.js";
import DeleteProfileCommandHandler from "../../../../dist/application/profiles/commandHandlers/deleteProfileById.js";
import FindProfileQueryHandler from "../../../../dist/application/profiles/queryHandlers/findProfileById.js";
import UpdateProfileCommandHandler from "../../../../dist/application/profiles/commandHandlers/updateProfile.js";
import ProfilesFactory from "../../../../dist/domain/profiles/factory/profilesFactory.js";
import ProfilesDomainService from "../../../../dist/domain/profiles/service/profilesDomainService.js";

describe("Profiles Use cases tests", () => {
  let repo, service, createHandler, findHandler;

  beforeEach(() => {
    repo = new InMemoryProfilesRepository();
    service = new ProfilesDomainService(repo);
    createHandler = new CreateProfileCommandHandler(
      repo,
      ProfilesFactory,
      service,
    );
    findHandler = new FindProfileQueryHandler(repo);
  });

  test("Should create profile", async () => {
    const result = await createHandler.handle({
      userId: 1,
      phone: "+380991112233",
      bio: "Test bio",
    });

    const profile = await findHandler.handle({ id: 1 });
    expect(result.id).toBe(1);
    expect(profile.phone).toBe("+380991112233");
  });

  test("Should update profile", async () => {
    await createHandler.handle({
      userId: 1,
      phone: "+380991112233",
      bio: "Old",
    });
    const updateHandler = new UpdateProfileCommandHandler(repo, service);

    await updateHandler.handle({
      id: 1,
      phone: "+380997778899",
      bio: "Updated bio",
    });

    const profile = await findHandler.handle({ id: 1 });
    expect(profile.phone).toBe("+380997778899");
    expect(profile.bio).toBe("Updated bio");
  });

  test("Should delete profile", async () => {
    await createHandler.handle({
      userId: 1,
      phone: "+380991112233",
      bio: "To delete",
    });
    const deleteHandler = new DeleteProfileCommandHandler(repo);

    const isDeleted = await deleteHandler.handle({ id: 1 });
    expect(isDeleted).toBe(true);

    await expect(findHandler.handle({ id: 1 })).rejects.toThrow();
  });
});

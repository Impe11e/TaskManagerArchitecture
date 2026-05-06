import ProfilesFactory from "../../../../dist/domain/profiles/factory/profilesFactory.js";
import ProfilesDomainService from "../../../../dist/domain/profiles/service/profilesDomainService.js";
import InMemoryProfilesRepository from "../profileRepoMock.js";
import PhoneObj from "../../../../dist/domain/profiles/valueObjects/phoneObj.js";

describe("Profiles Domain Tests", () => {
  const VALID_PHONE = "+380991112233";
  const UPDATED_PHONE = "+380997778899";

  test("should create profile entity", async () => {
    const repo = new InMemoryProfilesRepository();
    const service = new ProfilesDomainService(repo);
    const factory = new ProfilesFactory(service);

    const profile = await factory.create(1, VALID_PHONE, "Bio");

    expect(profile).toBeDefined();
    expect(profile.phone.value).toBe(VALID_PHONE);
  });

  test("should reconstitute profile with id", () => {
    const profile = ProfilesFactory.reconstitute(1, 2, VALID_PHONE, "Bio");
    expect(profile.id.value).toBe(1);
    expect(profile.userId.value).toBe(2);
  });

  test("should update profile entity", () => {
    const profile = ProfilesFactory.reconstitute(1, 2, VALID_PHONE, "Old");
    profile.update({ phone: new PhoneObj(UPDATED_PHONE), bio: "New" });

    expect(profile.phone.value).toBe(UPDATED_PHONE);
    expect(profile.bio).toBe("New");
  });
});

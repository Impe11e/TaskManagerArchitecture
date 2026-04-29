import ProfileRepoMock from "../profileRepoMock.js";
import ProfilesFactory from "../../../../dist/domain/profiles/factory/profilesFactory.js";
import ProfilesDomainService from "../../../../dist/domain/profiles/service/profilesDomainService.js";

describe("Profiles Domain Entity & Service test", () => {
    
    test("should create profile entity via factory", () => {
        const profile = ProfilesFactory.create(null, 5, "+380501112233", "Hello");
        expect(profile.userId).toBe(5);
        expect(profile.phone).toBe("+380501112233");
    });

    test("should throw error if userId already has a profile", async () => {
        const mockRepo = new ProfileRepoMock();
        
        await mockRepo.create({ userId: 10, phone: "+380000000000", bio: "" });
        
        const service = new ProfilesDomainService(mockRepo);

        await expect(service.checkExistingProfile(10))
            .rejects
            .toThrow(/already exists/); 
    });
});
export interface IService {
  checkExistingProfile(userId: number): Promise<void>;
}

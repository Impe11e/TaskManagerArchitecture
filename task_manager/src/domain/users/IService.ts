export interface IService {
    checkByEmail(email: string): Promise<void>
    checkByUsername(username:string): Promise<void>
}
import type {IUserRepository} from "../../../domain/users/repoInterfaces/IUserRepo.ts";
import type { Pool } from 'pg';
import UsersMapper from "../mapper/usersMapper.js";
import queries from "./queries.js"

class UsersRepository implements IUserRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async create(entity) {
        const userObj = UsersMapper.toPersistence(entity);
        const {id, ...data} = userObj;

        const response = await this.pool.query(queries.create, [data.username, data.email, data.password]);
        const created = response.rows[0]

        return UsersMapper.toDomain(created);
    }


    async update(entity) {
        const userObj = UsersMapper.toPersistence(entity);
        const {id, ...data} = userObj;

        const query = queries.update;
        const response = await this.pool.query(query, [data.username,data.email,data.password, id]);

        return UsersMapper.toDomain(response.rows[0]);
    }

    async findById(id) {
        const response = await this.pool.query(queries.findById, [id]);
        const user = response.rows[0];

        if(!user) {
            return null;
        }

        return UsersMapper.toDomain(user)
    }

    async deleteById(id) {
        const response = await this.pool.query(queries.deleteById, [id]);
        return response.rowCount > 0;
    }

    async checkByUsername(username){
        const response = await this.pool.query(queries.findUsername, [username]);
        return response.rowCount > 0;
    }

    async checkByEmail(email){
        const response = await this.pool.query(queries.findEmail, [email]);
        return response.rowCount > 0;
    }

}

export default UsersRepository;
import type {IUserRepository} from "../../../domain/users/domainRequires/repo/IUserRepo.ts";
import type {TUserEntity} from "../../../domain/users/domainRequires/repo/TUserEntity.js";

import type {Pool} from 'pg';
import UsersMapper from "../mapper/usersMapper.js";
import queries from "./queries.js"
import Id from "../../../domain/users/valueObjects/idObj.js";
import type Username from "../../../domain/users/valueObjects/usernameObj.js";
import type Email from "../../../domain/users/valueObjects/emailObj.js";
import type {TNewUserEntity} from "../../../domain/users/domainRequires/repo/TNewUserEntity.js";

class UsersRepository implements IUserRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async create(entity: TNewUserEntity): Promise<TUserEntity> {
        const userObj = UsersMapper.toDataObjNewUser(entity);

        const response = await this.pool.query(queries.create, [userObj.username, userObj.email, userObj.password]);
        const created = response.rows[0]

        return UsersMapper.toDomain(created);
    }


    async update(entity: TUserEntity): Promise<TUserEntity> {
        const userObj = UsersMapper.toDataObjUser(entity);
        const {id, ...data} = userObj;

        const query = queries.update;
        const response = await this.pool.query(query, [data.username, data.email, data.password, id]);

        return UsersMapper.toDomain(response.rows[0]);
    }

    async findById(id: Id): Promise<TUserEntity | null> {
        const response = await this.pool.query(queries.findById, [id.value]);
        const user = response.rows[0];

        if (!user) {
            return null;
        }

        return UsersMapper.toDomain(user)
    }

    async deleteById(id: Id): Promise<boolean> {
        const response = await this.pool.query(queries.deleteById, [id.value]);
        return (response.rowCount ?? 0) > 0;
    }

    async checkByUsername(username: Username): Promise<boolean> {
        const response = await this.pool.query(queries.findUsername, [username.value]);
        return (response.rowCount ?? 0) > 0;
    }

    async checkByEmail(email: Email): Promise<boolean> {
        const response = await this.pool.query(queries.findEmail, [email.value]);
        return (response.rowCount ?? 0) > 0;
    }
}

export default UsersRepository;
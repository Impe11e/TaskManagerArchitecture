import UserRepo from "../../../domain/users/repoInterfaces/userRepo.js";
import queries from "./queries.js"

class UsersRepository extends UserRepo {
    constructor(mapper, pool) {
        super();
        this.mapper = mapper;
        this.pool = pool;
    }

    async create(entity) {
        const userObj = this.mapper.toPersistence(entity);
        const {id, ...data} = userObj;

        const response = await this.pool.query(queries.create, [data.username, data.email, data.password]);
        const created = response.rows[0]

        return this.mapper.toDomain(created);
    }


    async update(entity) {
        const userObj = this.mapper.toPersistence(entity);
        const {id, ...data} = userObj;

        const query = queries.update;
        const response = await this.pool.query(query, [data.username,data.email,data.password, id]);

        return this.mapper.toDomain(response.rows[0]);
    }

    async findById(id) {
        const response = await this.pool.query(queries.findById, [id]);
        const user = response.rows[0];
        return this.mapper.toDomain(user)
    }

    async deleteById(id) {
        const response = await this.pool.query(queries.deleteById, [id]);
        return response.rowCount > 0;
    }

}

//export default new UsersRepo(usersFactory, UserMapper, pool);
export default UsersRepository;
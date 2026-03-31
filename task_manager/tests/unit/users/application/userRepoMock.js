import UserRepo from "../../../../src/domain/users/repoInterfaces/userRepo.js";

class InMemoryUsersRepository extends UserRepo{
    constructor() {
        super()
        this.users = [];
        this.currentId = 1;
    }

    async create(entity) {
        // емуляція поведінки БД: проставляємо id
        entity.id = this.currentId++;

        this.users.push(entity);

        return entity;
    }

    async update(entity) {
        const index = this.users.findIndex(u => u.id === entity.id);

        if (index === -1) {
            return null;
        }

        this.users[index] = entity;

        return entity;
    }

    async findById(id) {
        return this.users.find(u => u.id === Number(id)) || null;
    }

    async deleteById(id) {
        const index = this.users.findIndex(u => u.id === Number(id));

        if (index === -1) return false;

        this.users.splice(index, 1);
        return true;
    }

    async checkByUsername(username) {
        return this.users.some(u => u.username === username);
    }

    async checkByEmail(email) {
        return this.users.some(u => u.email === email);
    }
}

export default InMemoryUsersRepository;
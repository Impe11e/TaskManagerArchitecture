import UsersMapper from './usersMapper.js';

class InMemoryUsersRepository {
    constructor() {
        this.users = []; // зберігаємо як "row-like" об'єкти (як з БД)
        this.currentId = 1;
    }

    async create(entity) {
        const userObj = UsersMapper.toDataObjNewUser(entity);

        const row = {
            id: this.currentId++,
            username: userObj.username,
            email: userObj.email,
            password: userObj.password,
        };

        this.users.push(row);

        return UsersMapper.toDomain(row);
    }

    async update(entity) {
        const userObj = UsersMapper.toDataObjUser(entity);

        const index = this.users.findIndex(
            u => u.id === userObj.id
        );

        if (index === -1) {
            return null;
        }

        const updatedRow = {
            ...this.users[index],
            username: userObj.username,
            email: userObj.email,
            password: userObj.password,
        };

        this.users[index] = updatedRow;

        return UsersMapper.toDomain(updatedRow);
    }

    async findById(id) {
        const row = this.users.find(
            u => u.id === id.value
        ) || null;

        if (!row) return null;

        return UsersMapper.toDomain(row);
    }

    async deleteById(id) {
        const index = this.users.findIndex(
            u => u.id === id.value
        );

        if (index === -1) return false;

        this.users.splice(index, 1);
        return true;
    }

    async checkByUsername(username) {
        return this.users.some(
            u => u.username === username.value
        );
    }

    async checkByEmail(email) {
        return this.users.some(
            u => u.email === email.value
        );
    }
}

export default InMemoryUsersRepository;
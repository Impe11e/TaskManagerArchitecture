class InMemoryProfilesRepository {
    constructor() {
        this.profiles = [];
        this.currentId = 1;
    }

    async create(entity) {
        entity.id = this.currentId++;
        this.profiles.push(entity);
        return entity;
    }

    async update(entity) {
        const index = this.profiles.findIndex(p => p.id === entity.id);
        if (index === -1) return null;
        this.profiles[index] = entity;
        return entity;
    }

    async findById(id) {
        return this.profiles.find(p => p.id === Number(id)) || null;
    }

    async findByUserId(userId) {
        return this.profiles.find(p => p.userId === Number(userId)) || null;
    }

    async deleteById(id) {
        const index = this.profiles.findIndex(p => p.id === Number(id));
        if (index === -1) return false;
        this.profiles.splice(index, 1);
        return true;
    }

    async checkByUserId(userId) {
        return this.profiles.some(p => p.userId === Number(userId));
    }
}

export default InMemoryProfilesRepository;
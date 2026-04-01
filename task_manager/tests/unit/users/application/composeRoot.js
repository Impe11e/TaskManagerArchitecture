//infrastructure
import InMemoryUsersRepository from "./userRepoMock.js";

const usersRepository = new InMemoryUsersRepository()

//application
import CreateUser from "../../../../src/application/users/useCases/createUser.js";
import DeleteUser from "../../../../src/application/users/useCases/deleteUserById.js"
import FindUserById from "../../../../src/application/users/useCases/findUserById.js"
import UpdateUser from "../../../../src/application/users/useCases/updateUser.js"
import UsersFabric from "../../../../src/domain/users/fabrics/usersFabric.js";
import UsersDomainService from "../../../../src/domain/users/service/usersDomainService.js";

const usersDomainService = new UsersDomainService(usersRepository);
const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);
const updateUser = new UpdateUser(usersRepository, usersDomainService);
const findUserById = new FindUserById(usersRepository);
const deleteUserById = new DeleteUser(usersRepository);

export { createUser, updateUser, findUserById, deleteUserById };
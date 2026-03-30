//infrastructure
import pool from '../../infrastructure/pool.js'
import UsersRepository from '../../infrastructure/users/repository/userRepo.js'

const usersRepository = new UsersRepository(pool)

//application
import CreateUser from "../../application/users/useCases/createUser.js";
import DeleteUser from "../../application/users/useCases/deleteUserById.js"
import FindUserById from "../../application/users/useCases/findUserById.js"
import UpdateUser from "../../application/users/useCases/updateUser.js"
import UsersFabric from "../../domain/users/fabrics/usersFabric.js";
import UsersDomainService from "../../domain/users/service/usersDomainService.js";

const usersDomainService = new UsersDomainService(usersRepository);
const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);
const updateUser = new UpdateUser(usersRepository, usersDomainService);
const findUserById = new FindUserById(usersRepository);
const deleteUserById = new DeleteUser(usersRepository);

//controller (part of presentation)
import UsersController from "../../presentation/users/controller/usersController.js";

const usersController = new UsersController(createUser, updateUser, findUserById, deleteUserById);

export default { usersController };
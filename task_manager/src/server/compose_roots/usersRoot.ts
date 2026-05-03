//infrastructure
import pool from '../../infrastructure/pool.js'
import UsersRepository from '../../infrastructure/users/repository/usersRepo.js'

const usersRepository = new UsersRepository(pool)

//domain
import UsersDomainService from "../../domain/users/service/usersDomainService.js";
import UsersFactory from "../../domain/users/factory/usersFactory.js"
const usersDomainService = new UsersDomainService(usersRepository);
const usersFactory = new UsersFactory(usersDomainService)

//application
import CreateUserHandler from "../../application/users/commandHandlers/createUser.js";
import DeleteUser from "../../application/users/commandHandlers/deleteUserById.js"
import FindUserQueryHandler from "../../application/users/queryHandlers/findUserById.js"
import UpdateUserCommandHandler from "../../application/users/commandHandlers/updateUser.js"
import AuditService from "../../modules/audit/AuditService.js";

const createUser = new CreateUserHandler(usersRepository, usersFactory);
const updateUser = new UpdateUserCommandHandler(usersRepository, usersDomainService);
const findUserById = new FindUserQueryHandler(usersRepository);
const auditService = new AuditService()
const deleteUserById = new DeleteUser(usersRepository, auditService);

//controller (part of presentation)
import UsersController from "../../presentation/users/controller/usersController.js";

const usersController = new UsersController(createUser, updateUser, findUserById, deleteUserById);

export default { usersController };
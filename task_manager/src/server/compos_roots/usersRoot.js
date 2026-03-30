//infrastructure
import UsersMapper from '../../infrastructure/users/mapper/usersMapper.js'
import pool from '../../infrastructure/pool.js'
import UsersRepository from '../../infrastructure/users/repository/userRepo.js'

const usersRepository = new UsersRepository(UsersMapper, pool)

//application

import CreateUser from "../../application/users/useCases/createUser.js";
import DeleteUser from "../../application/users/useCases/deleteUserById.js"
import FindUserById from "../../application/users/useCases/findUserById.js"
import UpdateUser from "../../application/users/useCases/updateUser.js"
import UsersResponseDtoMapper from "../../presentation/users/responseDto/usersResponseDtoMapper.js";
import UserEntity from "../../domain/users/entity/userEntity.js";

const createUser = new CreateUser(usersRepository,UserEntity);
const updateUser = new UpdateUser(usersRepository);
const findUserById = new FindUserById(usersRepository);
const deleteUserById = new DeleteUser(usersRepository);

//controller (part of presentation)
import UsersController from "../../presentation/users/controller/usersController.js";

const usersController = new UsersController(createUser, updateUser, findUserById, deleteUserById);

export default { usersController };
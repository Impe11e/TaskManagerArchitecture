import {Router} from 'express';
import  userController  from '../../controllers/userController';

const router = Router();

//find user
router.get('/:user_id', async (req, res) => {
    const result = await userController.findUserById(req);
    res.status(result.status).json(result.data);
});

//create user with profile
router.post('/create', async (req, res) => {
    const result = await userController.createUser(req);
    res.status(result.status).json(result.data);
});

//update user
router.patch('/update/:user_id', async (req, res) => {
    const result = await userController.updateUser(req);
    res.status(result.status).json(result.data);
});

//delete user
router.delete('/delete/:user_id', async (req, res) => {
    const result = await userController.deleteUserById(req);
    res.status(result.status).json(result.data);
});

export default router;
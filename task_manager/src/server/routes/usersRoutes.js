import {Router} from 'express';
import usersController from '../../controllers/userController.js';

const router = Router();

//find user
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const result = usersController.findById(id);
    res.status(result.status).json(result.data);
});

//create user with profile
router.post('/', async (req, res) => {
    const data = req.body;
    const result = usersController.create(data);
    res.status(result.status).json(result.data);
});

//update user
router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    const result = usersController.update(id, body);
    res.status(result.status).json(result.data);
});

//delete user
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = usersController.deleteById(id);
    res.status(result.status).json(result.data);
});

export default router;
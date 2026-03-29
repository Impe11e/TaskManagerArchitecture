import {Router} from 'express';

const router = Router();

const getRouter = (controller) => {
//find user
    router.get('/:id', async (req, res) => {
        const {id} = req.params;
        const parsedId = parseInt(id)
        const result = await controller.findById(parsedId);
        res.status(result.status).json(result.data);
    });

//create user with profile
    router.post('/', async (req, res) => {
        const data = req.body;
        const result = await controller.create(data);
        res.status(result.status).json(result.data);
    });

//update user
    router.patch('/:id', async (req, res) => {
        const {id} = req.params;
        const parsedId = parseInt(id)
        const body = req.body;
        const result = await controller.update(parsedId, body);
        res.status(result.status).json(result.data);
    });

//delete user
    router.delete('/:id', async (req, res) => {
        const {id} = req.params;
        const parsedId = parseInt(id)
        const result = await controller.deleteById(parsedId);
        res.status(result.status).json(result.data);
    });

    return router;
}

export default getRouter;
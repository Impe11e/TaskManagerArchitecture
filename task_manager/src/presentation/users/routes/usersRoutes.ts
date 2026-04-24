import { Router } from 'express';
import type { Request, Response } from 'express';
import type {IUserController} from "../presentationRequires/IUserController.js";

const router = Router();

const getRouter = (controller: IUserController) => {

    //get user by id
    router.get('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await controller.findById(id[0]);
        res.status(result.status).json(result.data);
    });

    //create user
    router.post('/', async (req: Request, res: Response) => {
        const result = await controller.create(req.body);
        res.status(result.status).json(result.data);
    });

    //update user by id
    router.patch('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await controller.update(id[0], req.body);
        res.status(result.status).json(result.data);
    });

    //delete user by id
    router.delete('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await controller.deleteById(id[0]);
        res.status(result.status).json(result.data);
    });

    return router;
};

export default getRouter;
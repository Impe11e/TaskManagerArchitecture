import { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/taskController.js';

export const getRouter = (controller: TaskController) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    const result = await controller.getAll();
    res.status(result.status).json(result.data);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await controller.getById(Number(id));
    res.status(result.status).json(result.data);
  });

  router.post('/', async (req: Request, res: Response) => {
    const result = await controller.create(req.body);
    res.status(result.status).json(result.data);
  });

  router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await controller.update(Number(id), req.body);
    if (result.status === 204) {
      res.status(204).send();
      return;
    }
    res.status(result.status).json(result.data);
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await controller.delete(Number(id));
    res.status(result.status).send();
  });

  return router;
};

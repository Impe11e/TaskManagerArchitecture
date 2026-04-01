import { Router } from 'express';

const router = Router();

const getRouter = (controller) => {
  router.get('/', async (req, res) => {
    const result = await controller.getAll();
    res.status(result.status).json(result.data);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await controller.getById(id);
    res.status(result.status).json(result.data);
  });

  router.post('/', async (req, res) => {
    const result = await controller.create(req.body);
    res.status(result.status).json(result.data);
  });

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await controller.update(id, req.body);
    res.status(result.status).json(result.data);
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await controller.delete(id);
    res.status(result.status).send();
  });

  return router;
};

export default getRouter;
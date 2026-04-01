import { Router } from "express";

const getRouter = (controller) => {
  const router = Router();

  router.get("/:id", async (req, res) => {
    const result = await controller.findById(req.params.id);
    res.status(result.status).json(result.data);
  });

  router.post("/", async (req, res) => {
    const result = await controller.create(req.body);
    res.status(result.status).json(result.data);
  });

  router.patch("/:id", async (req, res) => {
    const result = await controller.update(req.params.id, req.body);
    res.status(result.status).json(result.data);
  });

  router.delete("/:id", async (req, res) => {
    const result = await controller.deleteById(req.params.id);
    res.status(result.status).json(result.data);
  });

  return router;
};

export default getRouter;

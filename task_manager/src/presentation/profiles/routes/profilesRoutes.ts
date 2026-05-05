import { Router } from "express";
import type { Request, Response } from "express";
import type { IProfileController } from "../controllerRequires/IProfileController.js";

const router = Router();

const getRouter = (controller: IProfileController) => {
  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await controller.findById(id);
    res.status(result.status).json(result.data);
  });

  router.post("/", async (req: Request, res: Response) => {
    const result = await controller.create(req.body);
    res.status(result.status).json(result.data);
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await controller.update(id, req.body);
    res.status(result.status).json(result.data);
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await controller.deleteById(id);
    res.status(result.status).json(result.data);
  });

  return router;
};

export default getRouter;

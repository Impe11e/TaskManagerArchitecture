import { Router } from "express";
import profileController from "../../controllers/profileController";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = profileController.findById(id);
  res.status(result.status).json(result.data);
});

router.post("/", async (req, res) => {
  const result = profileController.create(req.body);
  res.status(result.status).json(result.data);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const result = profileController.update(id, req.body);
  res.status(result.status).json(result.data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = profileController.deleteById(id);
  res.status(result.status).json(result.data);
});

export default router;

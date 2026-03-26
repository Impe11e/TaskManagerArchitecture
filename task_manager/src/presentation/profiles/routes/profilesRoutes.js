import { Router } from "express";

import profileRepo from "../../../infrastructure/profiles/repository/profileRepo.js";

import CreateProfile from "../../../application/profiles/useCases/createProfile.js";
import UpdateProfile from "../../../application/profiles/useCases/updateProfile.js";
import FindProfileById from "../../../application/profiles/useCases/findProfileById.js";
import DeleteProfileById from "../../../application/profiles/useCases/deleteProfileById.js";

import ProfileController from "../controller/profileController.js";

const createUseCase = new CreateProfile(profileRepo);
const updateUseCase = new UpdateProfile(profileRepo);
const findByIdUseCase = new FindProfileById(profileRepo);
const deleteUseCase = new DeleteProfileById(profileRepo);

const controller = new ProfileController(
  createUseCase,
  updateUseCase,
  findByIdUseCase,
  deleteUseCase,
);

const router = Router();

router.get("/:id", (req, res) => {
  const result = controller.findById(req.params.id);
  res.status(result.status).json(result.data);
});

router.post("/", (req, res) => {
  const result = controller.create(req.body);
  res.status(result.status).json(result.data);
});

router.patch("/:id", (req, res) => {
  const result = controller.update(req.params.id, req.body);
  res.status(result.status).json(result.data);
});

router.delete("/:id", (req, res) => {
  const result = controller.deleteById(req.params.id);
  res.status(result.status).json(result.data);
});

export default router;

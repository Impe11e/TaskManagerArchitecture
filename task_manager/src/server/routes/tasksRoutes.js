import { Router } from 'express';
import { taskController } from '../../infrastructure/container.js';
import { asyncHandler } from '../../presentation/utils/controllerUtils.js';

const router = Router();

router.get('/', asyncHandler((req, res) => taskController.getAll(req, res)));
router.get('/:id', asyncHandler((req, res) => taskController.getById(req, res)));
router.post('/', asyncHandler((req, res) => taskController.create(req, res)));
router.put('/:id', asyncHandler((req, res) => taskController.update(req, res)));
router.delete('/:id', asyncHandler((req, res) => taskController.delete(req, res)));

export default router;
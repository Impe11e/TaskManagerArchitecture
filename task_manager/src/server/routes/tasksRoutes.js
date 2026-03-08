import { Router } from 'express';
import taskController from '../../controllers/taskController.js';

const router = Router();

// GET /tasks
router.get('/', (req, res) => {
	const result = taskController.getAll();
	res.status(result.status).json(result.data);
});

// GET /tasks/:id
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const result = taskController.getById(id);
	res.status(result.status).json(result.data);
});

// POST /tasks
router.post('/', (req, res) => {
	const data = req.body;
	const result = taskController.create(data);
	res.status(result.status).json(result.data);
});

// PUT /tasks/:id
router.put('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const data = req.body;
	const result = taskController.update(id, data);
	res.status(result.status).json(result.data);
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const result = taskController.delete(id);
	if (result.status === 204) {
		res.status(204).send();
	} else {
		res.status(result.status).json(result.data);
	}
});

export default router;

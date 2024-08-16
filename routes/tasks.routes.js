import { Router } from 'express';

const taskRoutes = Router();

import {
    getAllTasks,
    getOnetask,
    postOnetask,
    putOnetask,
    delOnetask,
} from '../controllers/tasks.controller.js';

import {
    createTaskValidation,
    updateTaskValidation,
    idTaskValidation,
} from '../validations/task.validations.js'

import { applyValidations } from '../middlewares/applyValidation.js';

taskRoutes.get('/', getAllTasks);
taskRoutes.get('/:id', idTaskValidation, applyValidations, getOnetask);
taskRoutes.post('/', createTaskValidation, applyValidations, postOnetask);
taskRoutes.put('/:id', updateTaskValidation, applyValidations, putOnetask);
taskRoutes.delete('/:id', idTaskValidation, applyValidations, delOnetask);

export { taskRoutes };

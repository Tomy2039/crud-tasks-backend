import { Router } from 'express';

const taskRoutes = Router();

import {
    getAllTasks,
    getOnetask,
    postOnetask,
    putOnetask,
    delOnetask,
} from '../controllers/tasks.controller.js';

taskRoutes.get('/', getAllTasks);
taskRoutes.get('/:id', getOnetask);
taskRoutes.post('/', postOnetask);
taskRoutes.put('/:id', putOnetask);
taskRoutes.delete('/:id', delOnetask);

export { taskRoutes };

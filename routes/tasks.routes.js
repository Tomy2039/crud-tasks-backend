const router = require('express').Router();
const {
    getAllTasks,
    getOnetask,
    postOnetask,
    putOnetask,
    deleteOnetask,
} = require('../controllers/tasks.controller');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getOnetask);
router.post('/tasks', postOnetask);
router.put('/tasks/:id', putOnetask);
router.delete('/tasks/:id', deleteOnetask);

module.exports = router;

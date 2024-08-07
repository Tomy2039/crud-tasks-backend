const router = require('express').Router();
const {
    getAllTasks,
    getOnetask,
    postOnetask,
    putOnetask,
} = require('../controllers/tasks.controller');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getOnetask);
router.post('/tasks', postOnetask);
router.put('/tasks/:id', putOnetask);

module.exports = router;

const router = require('express').Router();
const {
    getAllTasks,
    getOnetask,
    postOnetask,
} = require('../controllers/tasks.controller');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getOnetask);
router.post('/tasks', postOnetask);
module.exports = router;

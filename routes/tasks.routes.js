const router = require('express').Router();
const {
    getAllTasks,
    getOnetask,
} = require('../controllers/tasks.controller');

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getOnetask)
module.exports = router;

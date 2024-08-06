const router = require('express').Router();
const {
    getAllTasks,
} = require('../controllers/tasks.controller');

router.get('/tasks', getAllTasks);

module.exports = router;

const express = require('express');
const tasks = require('./task.controller');
const router = express.Router();

router.route('/')
.get(tasks.get_all_tasks)
.post(tasks.create_task);


router.route('/:taskId')
  .get(tasks.get)
  .put(tasks.update_task)
  .delete(tasks.delete_task);

router.param('taskId', tasks.load);

module.exports = router;
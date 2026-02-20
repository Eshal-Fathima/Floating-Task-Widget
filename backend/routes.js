/**
 * API Routes
 * Maps HTTP endpoints to task controller functions.
 */

const express = require('express');
const router = express.Router();
const { getTodayTasks, addTask, completeTask, archiveTask } = require('./taskController');

// GET    /api/tasks              — Fetch today's pending + completed tasks
router.get('/tasks', getTodayTasks);

// POST   /api/tasks              — Add a new task
router.post('/tasks', addTask);

// PUT    /api/tasks/:id/complete — Mark a task as completed
router.put('/tasks/:id/complete', completeTask);

// PUT    /api/tasks/:id/archive  — Soft-delete (archive) a task
router.put('/tasks/:id/archive', archiveTask);

module.exports = router;

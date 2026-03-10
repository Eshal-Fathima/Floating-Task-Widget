/**
 * API Routes
 * Maps HTTP endpoints to task and folder controller functions.
 */

const express = require('express');
const router = express.Router();
const db = require('./db'); // your existing mysql2 connection

const {
    getTodayTasks,
    addTask,
    completeTask,
    archiveTask,
} = require('./taskController');

// ── Task Routes ───────────────────────────────────────────────────────────────

// GET  /api/tasks              — Fetch all pending + completed tasks (optional ?folder_id=)
router.get('/tasks', getTodayTasks);

// POST /api/tasks              — Add a new task
router.post('/tasks', addTask);

// PUT  /api/tasks/:id/complete — Mark a task as completed
router.put('/tasks/:id/complete', completeTask);

// PUT  /api/tasks/:id/archive  — Soft-delete (archive) a task
router.put('/tasks/:id/archive', archiveTask);

// ── Folder Routes ─────────────────────────────────────────────────────────────

// GET /api/folders — return all folders
router.get('/folders', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM folders ORDER BY created_at ASC'
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/folders — create a folder
router.post('/folders', async (req, res) => {
    const { name, color = '#FFAD0D' } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Name is required' });
    try {
        const [result] = await db.query(
            'INSERT INTO folders (name, color) VALUES (?, ?)',
            [name.trim(), color]
        );
        const [rows] = await db.query(
            'SELECT * FROM folders WHERE id = ?', [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/folders/:id — delete folder (tasks become un-foldered, not deleted)
router.delete('/folders/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM folders WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
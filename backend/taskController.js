/**
 * Task Controller
 * Handles all task-related database operations.
 */

const pool = require('./db');

/**
 * Get all tasks (pending + completed, no archived).
 * Returns tasks across all dates, pending tasks shown first.
 * Optionally filtered by folder_id via query param.
 */
async function getTodayTasks(req, res) {
    try {
        const { folder_id } = req.query;
        const [rows] = await pool.query(
            `SELECT * FROM tasks
             WHERE status != 'archived'
             ${folder_id ? 'AND folder_id = ?' : ''}
             ORDER BY
               status = 'pending' DESC,
               created_at DESC`,
            folder_id ? [folder_id] : []
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
}

/**
 * Add a new task.
 * Expects: { title, category?, folder_id? } in request body.
 * created_at is auto-set by MySQL.
 */
async function addTask(req, res) {
    try {
        const { title, category, folder_id } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Task title is required.' });
        }

        const [result] = await pool.query(
            'INSERT INTO tasks (title, category, folder_id) VALUES (?, ?, ?)',
            [title.trim(), category || null, folder_id || null]
        );

        // Return the newly created task
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error adding task:', error.message);
        res.status(500).json({ error: 'Failed to add task.' });
    }
}

/**
 * Mark a task as completed.
 * Sets status to 'completed', completed_at to NOW(),
 * and calculates duration_minutes from created_at.
 */
async function completeTask(req, res) {
    try {
        const { id } = req.params;

        await pool.query(
            `UPDATE tasks
             SET status = 'completed',
                 completed_at = NOW(),
                 duration_minutes = TIMESTAMPDIFF(MINUTE, created_at, NOW())
             WHERE id = ? AND status = 'pending'`,
            [id]
        );

        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error completing task:', error.message);
        res.status(500).json({ error: 'Failed to complete task.' });
    }
}

/**
 * Soft-delete a task by setting status to 'archived'.
 * The row remains in the database for analytics.
 */
async function archiveTask(req, res) {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `UPDATE tasks SET status = 'archived' WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.json({ message: 'Task archived successfully.' });
    } catch (error) {
        console.error('Error archiving task:', error.message);
        res.status(500).json({ error: 'Failed to archive task.' });
    }
}

module.exports = { getTodayTasks, addTask, completeTask, archiveTask };
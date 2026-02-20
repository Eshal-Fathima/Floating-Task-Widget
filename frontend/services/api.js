/**
 * API Service
 * Handles all HTTP requests to the backend.
 */

const API_BASE = 'http://localhost:3001/api';

/**
 * Fetch today's tasks (pending + completed).
 */
export async function fetchTasks() {
    const response = await fetch(`${API_BASE}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
}

/**
 * Add a new task.
 * @param {string} title - The task title.
 * @param {string} [category] - Optional category.
 */
export async function addTask(title, category) {
    const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category }),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return response.json();
}

/**
 * Mark a task as completed.
 * @param {number} id - The task ID.
 */
export async function completeTask(id) {
    const response = await fetch(`${API_BASE}/tasks/${id}/complete`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to complete task');
    return response.json();
}

/**
 * Archive (soft-delete) a task.
 * @param {number} id - The task ID.
 */
export async function archiveTask(id) {
    const response = await fetch(`${API_BASE}/tasks/${id}/archive`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to archive task');
    return response.json();
}

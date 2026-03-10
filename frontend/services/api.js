/**
 * API Service
 * Handles all HTTP requests to the backend.
 */

const API_BASE = 'http://localhost:3001/api';

// ── Tasks ─────────────────────────────────────────────────────────────────────

/**
 * Fetch all non-archived tasks, optionally filtered by folder.
 * @param {number|null} folderId
 */
export async function fetchTasks(folderId = null) {
    const url = folderId
        ? `${API_BASE}/tasks?folder_id=${folderId}`
        : `${API_BASE}/tasks`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
}

/**
 * Add a new task.
 * @param {string} title
 * @param {string|null} category
 * @param {number|null} folderId
 */
export async function addTask(title, category = null, folderId = null) {
    const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, folder_id: folderId }),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return response.json();
}

/**
 * Mark a task as completed.
 * @param {number} id
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
 * @param {number} id
 */
export async function archiveTask(id) {
    const response = await fetch(`${API_BASE}/tasks/${id}/archive`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to archive task');
    return response.json();
}

// ── Folders ───────────────────────────────────────────────────────────────────

/**
 * Fetch all folders.
 */
export async function fetchFolders() {
    const response = await fetch(`${API_BASE}/folders`);
    if (!response.ok) throw new Error('Failed to fetch folders');
    return response.json();
}

/**
 * Create a new folder.
 * @param {string} name
 * @param {string} color  hex color e.g. '#FFAD0D'
 */
export async function addFolder(name, color) {
    const response = await fetch(`${API_BASE}/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
    });
    if (!response.ok) throw new Error('Failed to add folder');
    return response.json();
}

/**
 * Delete a folder (tasks become un-foldered, not deleted).
 * @param {number} id
 */
export async function deleteFolder(id) {
    const response = await fetch(`${API_BASE}/folders/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete folder');
}
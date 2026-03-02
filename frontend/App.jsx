import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import {
    fetchTasks,
    addTask as apiAddTask,
    completeTask as apiCompleteTask,
    archiveTask as apiArchiveTask,
} from './services/api';
import './App.css';

/**
 * App Component
 * Main widget: loads all non-archived tasks on mount, manages state,
 * and wires up child components. Supports light/dark theme toggle.
 */
export default function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    // Load tasks from MySQL on mount
    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            setError(null);
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.error('Failed to load tasks:', err);
            setError('Could not connect to server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    }

    // Add a new task
    async function handleAdd(title) {
        try {
            setError(null);
            const newTask = await apiAddTask(title);
            setTasks((prev) => [newTask, ...prev]);
        } catch (err) {
            console.error('Failed to add task:', err);
            setError('Failed to add task.');
        }
    }

    // Mark a task as completed
    async function handleComplete(id) {
        try {
            setError(null);
            const updated = await apiCompleteTask(id);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (err) {
            console.error('Failed to complete task:', err);
            setError('Failed to complete task.');
        }
    }

    // Archive (soft-delete) a task
    async function handleArchive(id) {
        try {
            setError(null);
            await apiArchiveTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error('Failed to archive task:', err);
            setError('Failed to archive task.');
        }
    }

    function toggleTheme() {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }

    return (
        <div className="widget" data-theme={theme}>
            {/* Custom drag region / title bar */}
            <header className="widget-header" data-tauri-drag-region>
                <h1>📋 Tasks</h1>
                <div className="header-right">
                    <span className="date-label">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            {/* Error banner */}
            {error && <div className="error-banner">{error}</div>}

            {/* Summary + progress bar */}
            <ProgressBar tasks={tasks} />

            {/* Task input */}
            <TaskInput onAdd={handleAdd} />

            {/* Task list */}
            {loading ? (
                <p className="loading-message">Loading tasks...</p>
            ) : (
                <TaskList
                    tasks={tasks}
                    onComplete={handleComplete}
                    onArchive={handleArchive}
                />
            )}
        </div>
    );
}

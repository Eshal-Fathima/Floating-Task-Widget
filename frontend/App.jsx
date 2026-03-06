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

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    useEffect(() => { loadTasks(); }, []);

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
            {/* Ambient background orbs — dark mode only */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="widget-inner">
                {/* Header / drag region */}
                <header className="widget-header" data-tauri-drag-region>
                    <div className="header-left">
                        <h1>📋 Tasks</h1>
                        <span className="date-label">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'short', month: 'short', day: 'numeric',
                            })}
                        </span>
                    </div>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </header>

                {/* Error banner */}
                {error && <div className="error-banner">{error}</div>}

                {/* Progress */}
                <ProgressBar tasks={tasks} />

                {/* Input */}
                <TaskInput onAdd={handleAdd} />

                {/* Task list */}
                {loading ? (
                    <p className="loading-message">Loading tasks…</p>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onComplete={handleComplete}
                        onArchive={handleArchive}
                    />
                )}
            </div>
        </div>
    );
}

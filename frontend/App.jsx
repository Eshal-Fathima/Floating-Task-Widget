import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import Sidebar from './components/Sidebar';
import {
    fetchTasks,
    addTask as apiAddTask,
    completeTask as apiCompleteTask,
    archiveTask as apiArchiveTask,
    fetchFolders,
    addFolder as apiAddFolder,
    deleteFolder as apiDeleteFolder,
} from './services/api';
import './App.css';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [folders, setFolders] = useState([]);
    const [activeFolderId, setActiveFolderId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    useEffect(() => { bootstrap(); }, []);
    useEffect(() => { loadTasks(); }, [activeFolderId]);

    async function bootstrap() {
        try {
            const f = await fetchFolders();
            setFolders(f);
        } catch (err) {
            console.error('Failed to load folders:', err);
        }
    }

    async function loadTasks() {
        try {
            setError(null);
            setLoading(true);
            const data = await fetchTasks(activeFolderId);
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
            const newTask = await apiAddTask(title, null, activeFolderId);
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

    async function handleAddFolder(name, color) {
        try {
            const folder = await apiAddFolder(name, color);
            setFolders((prev) => [...prev, folder]);
        } catch (err) {
            console.error('Failed to add folder:', err);
            setError('Failed to create folder.');
        }
    }

    async function handleDeleteFolder(id) {
        try {
            await apiDeleteFolder(id);
            setFolders((prev) => prev.filter((f) => f.id !== id));
            if (activeFolderId === id) setActiveFolderId(null);
        } catch (err) {
            console.error('Failed to delete folder:', err);
            setError('Failed to delete folder.');
        }
    }

    const activeFolder = folders.find((f) => f.id === activeFolderId);

    return (
        <div className="widget" data-theme={theme}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="widget-inner">
                <Sidebar
                    folders={folders}
                    activeFolderId={activeFolderId}
                    onSelectFolder={setActiveFolderId}
                    onAddFolder={handleAddFolder}
                    onDeleteFolder={handleDeleteFolder}
                    theme={theme}
                    onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                />

                <div className="main-panel">
                    <header className="widget-header" data-tauri-drag-region>
                        <div className="header-left">
                            <h1>
                                {activeFolder ? (
                                    <>
                                        <span
                                            className="folder-header-dot"
                                            style={{ background: activeFolder.color }}
                                        />
                                        {activeFolder.name}
                                    </>
                                ) : '📋 All Tasks'}
                            </h1>
                            <span className="date-label">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'short', month: 'short', day: 'numeric',
                                })}
                            </span>
                        </div>
                    </header>

                    {error && <div className="error-banner">{error}</div>}

                    <ProgressBar tasks={tasks} />
                    <TaskInput onAdd={handleAdd} />

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
        </div>
    );
}
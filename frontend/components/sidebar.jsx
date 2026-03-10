import { useState } from 'react';

const COLORS = ['#FFAD0D', '#34D399', '#60A5FA', '#F472B6', '#A78BFA', '#FB923C'];

/**
 * Sidebar Component
 * Folder list + theme toggle. Matches the existing glassmorphism theme.
 */
export default function Sidebar({
    folders,
    activeFolderId,
    onSelectFolder,
    onAddFolder,
    onDeleteFolder,
    theme,
    onToggleTheme,
}) {
    const [adding, setAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newColor, setNewColor] = useState(COLORS[0]);
    const [hoveredId, setHoveredId] = useState(null);

    function handleKeyDown(e) {
        if (e.key === 'Enter' && newName.trim()) {
            onAddFolder(newName.trim(), newColor);
            setNewName('');
            setNewColor(COLORS[0]);
            setAdding(false);
        }
        if (e.key === 'Escape') {
            setAdding(false);
            setNewName('');
        }
    }

    return (
        <aside className="sidebar">
            {/* Top: logo mark + theme toggle */}
            <div className="sidebar-top">
                <span className="sidebar-mark">✦</span>
                <button
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>

            {/* All Tasks */}
            <button
                className={`folder-item ${activeFolderId === null ? 'active' : ''}`}
                onClick={() => onSelectFolder(null)}
            >
                <span className="folder-item-icon">📋</span>
                <span className="folder-item-name">All Tasks</span>
            </button>

            <div className="sidebar-divider" />

            {/* Folder list */}
            <div className="folder-list">
                {folders.map((f) => (
                    <button
                        key={f.id}
                        className={`folder-item ${activeFolderId === f.id ? 'active' : ''}`}
                        onClick={() => onSelectFolder(f.id)}
                        onMouseEnter={() => setHoveredId(f.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <span
                            className="folder-color-dot"
                            style={{ background: f.color }}
                        />
                        <span className="folder-item-name">{f.name}</span>
                        {hoveredId === f.id && (
                            <span
                                className="folder-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteFolder(f.id);
                                }}
                                title="Delete folder"
                            >
                                ✕
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Add folder */}
            <div className="sidebar-bottom">
                {adding ? (
                    <div className="folder-add-form">
                        <div className="color-picker">
                            {COLORS.map((c) => (
                                <button
                                    key={c}
                                    className={`color-dot ${newColor === c ? 'selected' : ''}`}
                                    style={{ background: c }}
                                    onClick={() => setNewColor(c)}
                                />
                            ))}
                        </div>
                        <input
                            autoFocus
                            className="folder-name-input"
                            placeholder="Folder name… Enter"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                ) : (
                    <button
                        className="add-folder-btn"
                        onClick={() => setAdding(true)}
                    >
                        <span>+</span> New Folder
                    </button>
                )}
            </div>
        </aside>
    );
}
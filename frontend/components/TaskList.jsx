/**
 * TaskList Component
 * Renders pending and completed tasks in separate sections.
 * Shows creation date under each task title.
 */
export default function TaskList({ tasks, onComplete, onArchive }) {
    const pending = tasks.filter((t) => t.status === 'pending');
    const completed = tasks.filter((t) => t.status === 'completed');

    if (tasks.length === 0) {
        return <p className="empty-message">No tasks yet. Add one above!</p>;
    }

    return (
        <div className="task-list-wrapper">
            {/* Pending Section */}
            {pending.length > 0 && (
                <section className="task-section">
                    <h2 className="section-header">Pending</h2>
                    <ul className="task-list">
                        {pending.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onComplete={onComplete}
                                onArchive={onArchive}
                            />
                        ))}
                    </ul>
                </section>
            )}

            {/* Completed Section */}
            {completed.length > 0 && (
                <section className="task-section">
                    <h2 className="section-header">Completed</h2>
                    <ul className="task-list">
                        {completed.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onComplete={onComplete}
                                onArchive={onArchive}
                            />
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

function TaskItem({ task, onComplete, onArchive }) {
    return (
        <li className={`task-item ${task.status}`}>
            {/* Checkbox to complete */}
            <button
                className="task-checkbox"
                onClick={() => task.status === 'pending' && onComplete(task.id)}
                disabled={task.status === 'completed'}
                title={task.status === 'completed' ? 'Already completed' : 'Mark complete'}
            >
                {task.status === 'completed' ? '✓' : '○'}
            </button>

            {/* Task info: title + date */}
            <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className="task-date">
                    {new Date(task.created_at).toLocaleDateString()}
                </span>
            </div>

            {/* Duration badge (shown when completed) */}
            {task.status === 'completed' && task.duration_minutes != null && (
                <span className="task-duration">{task.duration_minutes}m</span>
            )}

            {/* Archive button (soft delete) */}
            <button
                className="task-archive"
                onClick={() => onArchive(task.id)}
                title="Archive task"
            >
                ✕
            </button>
        </li>
    );
}

/**
 * TaskList Component
 * Renders pending and completed tasks in separate sections.
 */
export default function TaskList({ tasks, onComplete, onArchive }) {
    const pending = tasks.filter((t) => t.status === 'pending');
    const completed = tasks.filter((t) => t.status === 'completed');

    if (tasks.length === 0) {
        return <p className="empty-message">— no tasks yet —</p>;
    }

    return (
        <div className="task-list-wrapper">
            {pending.length > 0 && (
                <section className="task-section">
                    <h2 className="section-header">Pending</h2>
                    <ul className="task-list">
                        {pending.map((task) => (
                            <TaskItem key={task.id} task={task} onComplete={onComplete} onArchive={onArchive} />
                        ))}
                    </ul>
                </section>
            )}

            {completed.length > 0 && (
                <section className="task-section">
                    <h2 className="section-header">Completed</h2>
                    <ul className="task-list">
                        {completed.map((task) => (
                            <TaskItem key={task.id} task={task} onComplete={onComplete} onArchive={onArchive} />
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

function TaskItem({ task, onComplete, onArchive }) {
    const done = task.status === 'completed';

    return (
        <li className={`task-item ${task.status}`}>
            <button
                className="task-checkbox"
                onClick={() => !done && onComplete(task.id)}
                disabled={done}
                title={done ? 'Already completed' : 'Mark complete'}
            >
                {done ? '✓' : ''}
            </button>

            <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className="task-date">
                    {new Date(task.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                    })}
                </span>
            </div>

            {done && task.duration_minutes != null && (
                <span className="task-duration">{task.duration_minutes}m</span>
            )}

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

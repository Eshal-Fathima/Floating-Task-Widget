/**
 * TaskList Component
 * Renders pending and completed tasks with complete/archive actions.
 */
export default function TaskList({ tasks, onComplete, onArchive }) {
    if (tasks.length === 0) {
        return <p className="empty-message">No tasks yet. Add one above!</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.status}`}>
                    {/* Checkbox to complete */}
                    <button
                        className="task-checkbox"
                        onClick={() => task.status === 'pending' && onComplete(task.id)}
                        disabled={task.status === 'completed'}
                        title={task.status === 'completed' ? 'Already completed' : 'Mark complete'}
                    >
                        {task.status === 'completed' ? '✓' : '○'}
                    </button>

                    {/* Task title */}
                    <span className="task-title">{task.title}</span>

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
            ))}
        </ul>
    );
}

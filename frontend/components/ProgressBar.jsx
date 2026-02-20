/**
 * ProgressBar Component
 * Displays a visual bar showing completed / total task ratio.
 */
export default function ProgressBar({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-container">
            <div className="progress-info">
                <span>{completed}/{total} done</span>
                <span>{percent}%</span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

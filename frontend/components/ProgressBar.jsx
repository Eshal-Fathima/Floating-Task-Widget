/**
 * ProgressBar Component
 * Displays a summary line (Pending · Done · %) and a visual progress bar.
 */
export default function ProgressBar({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-container">
            <div className="progress-info">
                <span>
                    <strong>{pending}</strong> Pending &nbsp;·&nbsp;
                    <strong>{completed}</strong> Done
                </span>
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

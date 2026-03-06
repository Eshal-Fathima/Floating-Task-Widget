/**
 * ProgressBar Component
 * Stat chips (Pending / Done) + amber progress bar.
 */
export default function ProgressBar({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-container">
            {/* Stat chips */}
            <div className="stats-row">
                <div className="stat-chip amber">
                    <div className="stat-num">{pending}</div>
                    <div className="stat-label">Pending</div>
                </div>
                <div className="stat-chip green">
                    <div className="stat-num">{completed}</div>
                    <div className="stat-label">Done</div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="progress-info">
                <span className="p-label">Progress</span>
                <span className="p-pct">{percent}%</span>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}

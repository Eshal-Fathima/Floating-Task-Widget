import { useState } from 'react';

/**
 * TaskInput Component
 * Input field for adding new tasks. Submits on Enter key.
 */
export default function TaskInput({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && title.trim()) {
            await onAdd(title.trim());
            setTitle('');
        }
    };

    return (
        <div className="task-input">
            <input
                type="text"
                placeholder="Add a task... press Enter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    );
}

import React from 'react';

const ProgressBar = ({ current, total, className = '' }) => {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className={`w-full ${className}`}>
            {/* Label */}
            <div className="flex justify-between text-text-secondary text-sm mb-2 font-medium">
                <span>Progress</span>
                <span>{current}/{total}</span>
            </div>

            {/* Track */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Fill */}
                <div
                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(75,216,131,0.5)]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;

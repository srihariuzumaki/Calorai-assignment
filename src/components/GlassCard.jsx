import React from 'react';

const GlassCard = ({ children, className = '', strong = false, ...props }) => {
    return (
        <div
            className={`${strong ? 'glass-strong' : 'glass'} rounded-2xl p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassCard;

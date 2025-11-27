import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
    return (
        <div
            className={`
        glass-panel rounded-2xl p-6 transition-all duration-300
        ${hoverEffect ? 'hover:bg-[rgba(255,255,255,0.06)] hover:border-[var(--glass-highlight)] hover:shadow-[0_0_20px_rgba(0,242,255,0.1)] hover:-translate-y-1' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default GlassCard;

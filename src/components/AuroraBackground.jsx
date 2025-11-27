import React from 'react';

const AuroraBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            <img
                src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=7680&auto=format&fit=crop"
                alt="Aurora Borealis 8K"
                className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>
    );
};

export default AuroraBackground;

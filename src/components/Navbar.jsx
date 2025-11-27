import React from 'react';

const Navbar = () => {
    const links = [
        { name: 'GitHub', url: 'https://github.com/ozkan33' },
        { name: 'LeetCode', url: 'https://leetcode.com/u/funkhu33/' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/%C3%B6zkan-kahveci/' },
        { name: 'Email', url: 'mailto:ozkankahveci@outlook.com' }
    ];

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw]">
            <div className="glass-panel px-6 py-3 rounded-full flex gap-6 items-center justify-center">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target={link.name !== 'Email' ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group"
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--glow-primary)] transition-all duration-300 group-hover:w-full" />
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

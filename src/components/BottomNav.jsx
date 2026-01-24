import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    // Icons as simple SVG placeholders for now based on the design
    const NavIcon = ({ active, children }) => (
        <div className={`p-2 transition-colors duration-200 ${active ? 'text-primary' : 'text-text-tertiary'}`}>
            {children}
        </div>
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2">
            <div className="glass-strong rounded-[32px] h-[80px] flex items-center justify-between px-8 mx-auto max-w-[400px]">

                {/* Home Tab */}
                <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center">
                    <NavIcon active={isActive('/')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.0003 10.7961V19.9992H14.0003V13.9992H10.0003V19.9992H5.00026V10.7961L12.0003 4.49915L19.0003 10.7961Z"
                                fill="currentColor" fillOpacity={isActive('/') ? "1" : "0.5"} />
                        </svg>
                    </NavIcon>
                </button>

                {/* List/Orders Tab */}
                <button onClick={() => navigate('/list')} className="flex flex-col items-center justify-center">
                    <NavIcon active={isActive('/list')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </NavIcon>
                </button>

                {/* Swipe/Flame Tab */}
                <button onClick={() => navigate('/swipe')} className="flex flex-col items-center justify-center">
                    <NavIcon active={isActive('/swipe')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 14.5C8.5 14.5 13.5 14.5 13.5 9C13.5 6.5 12 5 12 5C12 5 16 7 16 11C16 15.5 12.5 19 12.5 19C12.5 19 8.5 16.5 8.5 14.5Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </NavIcon>
                </button>

                {/* Profile Tab */}
                <button onClick={() => navigate('/results')} className="flex flex-col items-center justify-center">
                    <NavIcon active={isActive('/results')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </NavIcon>
                </button>

            </div>
        </div>
    );
};

export default BottomNav;

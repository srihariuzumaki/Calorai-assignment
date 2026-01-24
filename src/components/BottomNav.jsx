import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
            <div className="glass-strong rounded-full h-[62px] flex items-center justify-between px-2 mx-auto max-w-[290px] bg-black/60 border-white/10 relative">

                {/* Start Tab - with green pill background when active */}
                <button
                    onClick={() => navigate('/')}
                    className="relative flex items-center justify-center gap-2 px-6 h-[54px] rounded-full transition-all"
                >
                    {isActive('/') && (
                        <div className="absolute inset-0 bg-[#121212] rounded-full"></div>
                    )}
                    <div className="relative flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={isActive('/') ? 'text-primary' : 'text-gray-400'}>
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
                        </svg>
                        <span className={`text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}>
                            Start
                        </span>
                    </div>
                </button>

                {/* FAQ Tab */}
                <button
                    onClick={() => navigate('/faq')}
                    className="flex flex-col items-center justify-center min-w-[40px] transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isActive('/faq') ? 'text-primary' : 'text-gray-400'}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                </button>

                {/* Taste Profile Tab */}
                <button
                    onClick={() => navigate('/results')}
                    className="flex flex-col items-center justify-center min-w-[40px] transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isActive('/results') ? 'text-primary' : 'text-gray-400'}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>

                {/* Search Tab */}
                <button
                    onClick={() => navigate('/search')}
                    className="flex flex-col items-center justify-center min-w-[40px] transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isActive('/search') ? 'text-primary' : 'text-gray-400'}>
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </button>

            </div>
        </div>
    );
};

export default BottomNav;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const mainNavItems = [
        { path: '/', label: 'Start', icon: 'home' },
        { path: '/faq', label: 'FAQ', icon: 'help' },
        { path: '/results', label: 'Taste Profile', icon: 'carrot' }
    ];

    // Find the index of the active main nav item based on route
    const getActiveIndex = () => {
        return mainNavItems.findIndex(item => {
            if (item.path === '/') {
                return location.pathname === '/' || location.pathname === '/swipe';
            }
            return location.pathname === item.path;
        });
    };

    const [activeIndex, setActiveIndex] = useState(getActiveIndex());
    const [pillPosition, setPillPosition] = useState(getActiveIndex());

    // Update active index when route changes
    useEffect(() => {
        const index = getActiveIndex();
        setActiveIndex(index);
        setPillPosition(index);
    }, [location.pathname]);

    const isSearchActive = location.pathname === '/search';

    const NavButton = ({ item, index, isActive }) => {
        const handleClick = () => {
            // Immediately move the pill
            setPillPosition(index);

            // Navigate after animation has time to start
            setTimeout(() => {
                navigate(item.path);
            }, 300);
        };

        return (
            <button
                onClick={handleClick}
                className="flex flex-col items-center gap-1 relative z-10 transition-all duration-300 flex-1 py-2"
            >
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    {item.icon === 'home' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={isActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="9 22 9 12 15 12 15 22" stroke={isActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {item.icon === 'help' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke={isActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={isActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="12" y1="17" x2="12.01" y2="17" stroke={isActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {item.icon === 'carrot' && (
                        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.5711 14.5615C25.3719 14.2793 25.2197 13.9085 25.1146 13.4492C25.0094 12.9899 24.9541 12.4919 24.9486 11.9551C24.9486 11.4183 24.9928 10.8898 25.0814 10.3696C25.1755 9.84391 25.3138 9.37354 25.4964 8.9585C25.679 8.54346 25.9059 8.22803 26.1771 8.01221C26.4482 7.79639 26.7637 7.72998 27.1234 7.81299C27.4775 7.896 27.7266 8.09521 27.8704 8.41064C28.0199 8.72607 28.0835 9.11068 28.0614 9.56445C28.0448 10.0127 27.9618 10.4914 27.8123 11.0005C27.6685 11.5041 27.4775 11.9966 27.2396 12.478C27.0072 12.9595 26.7443 13.3856 26.451 13.7563C26.1633 14.1271 25.87 14.3955 25.5711 14.5615ZM25.7371 14.9185C25.7205 14.5532 25.7842 14.1437 25.9281 13.6899C26.0719 13.2306 26.2767 12.7575 26.5423 12.2705C26.8079 11.7835 27.1123 11.3132 27.4554 10.8594C27.804 10.4056 28.172 9.99609 28.5594 9.63086C28.9523 9.26562 29.3425 8.97786 29.7298 8.76758C30.1227 8.55729 30.4963 8.45215 30.8504 8.45215C31.2046 8.44661 31.5173 8.57943 31.7884 8.85059C32.0651 9.12728 32.2007 9.44548 32.1952 9.80518C32.1952 10.1593 32.0872 10.5329 31.8714 10.9258C31.6611 11.3132 31.3734 11.7033 31.0081 12.0962C30.6484 12.4836 30.2417 12.8516 29.7879 13.2002C29.3341 13.5433 28.8638 13.8477 28.3768 14.1133C27.8953 14.3789 27.425 14.5837 26.9657 14.7275C26.5119 14.8714 26.1024 14.9351 25.7371 14.9185ZM26.1024 15.0762C26.2684 14.7829 26.5368 14.4924 26.9076 14.2046C27.2783 13.9168 27.7017 13.6567 28.1776 13.4243C28.659 13.1864 29.1543 12.9954 29.6634 12.8516C30.1725 12.7021 30.6512 12.6164 31.0994 12.5942C31.5532 12.5721 31.9378 12.6385 32.2533 12.7935C32.5687 12.9429 32.7679 13.1947 32.8509 13.5488C32.9339 13.9085 32.8675 14.224 32.6517 14.4951C32.4359 14.7607 32.1177 14.9849 31.6971 15.1675C31.2821 15.3501 30.8145 15.4857 30.2943 15.5742C29.7741 15.6628 29.2456 15.7043 28.7088 15.6987C28.172 15.6932 27.674 15.6406 27.2147 15.541C26.7554 15.4359 26.3846 15.2809 26.1024 15.0762ZM8.43 32.1841C8.098 31.8521 7.8905 31.4508 7.8075 30.9805C7.73 30.5156 7.8407 30.0452 8.1395 29.5693L15.7928 17.417L17.453 19.019C17.6079 19.174 17.785 19.2515 17.9842 19.2515C18.1834 19.2459 18.3605 19.1685 18.5155 19.019C18.6649 18.8641 18.7396 18.6842 18.7396 18.4795C18.7451 18.2747 18.6676 18.0949 18.5072 17.9399L16.6146 16.0972L17.2869 15.0347L19.8519 17.5332C20.0124 17.6937 20.195 17.7712 20.3997 17.7656C20.6045 17.7601 20.7816 17.6799 20.931 17.5249C21.0804 17.37 21.1523 17.1929 21.1468 16.9937C21.1468 16.7944 21.0693 16.6146 20.9144 16.4541L18.2498 13.856C18.8254 13.2251 19.4452 12.7464 20.1092 12.4199C20.7733 12.0879 21.4484 11.9053 22.1346 11.8721C22.8263 11.8389 23.5098 11.9634 24.1849 12.2456C24.86 12.5278 25.4964 12.9705 26.0941 13.5737L27.0155 14.5034C27.7127 15.2062 28.1942 15.9533 28.4598 16.7446C28.731 17.536 28.7918 18.3328 28.6424 19.1353C28.4985 19.9321 28.1554 20.6986 27.6131 21.4346C27.0708 22.1706 26.3376 22.8291 25.4134 23.4102L20.2254 26.6724L18.2913 24.8047C18.1309 24.6442 17.951 24.5667 17.7518 24.5723C17.5526 24.5778 17.3755 24.6553 17.2205 24.8047C17.0711 24.9596 16.9937 25.1395 16.9881 25.3442C16.9881 25.5435 17.0684 25.7205 17.2288 25.8755L18.9056 27.4941L17.8265 28.1748L16.4071 26.7969C16.2521 26.6419 16.0723 26.5645 15.8675 26.5645C15.6683 26.57 15.494 26.6475 15.3446 26.7969C15.1896 26.9518 15.1121 27.1289 15.1121 27.3281C15.1121 27.5329 15.1924 27.7127 15.3529 27.8677L16.5067 29.0049L10.995 32.4497C10.5024 32.7651 10.0265 32.8758 9.5672 32.7817C9.1134 32.6877 8.7344 32.4884 8.43 32.1841Z" fill={isActive ? '#4BD883' : '#BFBFBF'} />
                        </svg>
                    )}
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-primary' : 'text-[#BFBFBF]'}`}>
                    {item.label}
                </span>
            </button>
        );
    };

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-4 pb-4 pt-2">
            <div className="flex items-center justify-between gap-4">
                {/* Main Nav Capsule - 3 buttons */}
                <div className="glass-strong rounded-full h-[70px] flex items-center flex-1 bg-black/60 border-white/10 relative overflow-hidden">
                    {/* Animated background pill - centered perfectly */}
                    <div
                        className="absolute h-[58px] rounded-full bg-[#121212]"
                        style={{
                            width: 'calc(33.333% - 8px)',
                            left: `calc(${pillPosition * 33.333}% + 4px)`,
                            opacity: pillPosition >= 0 ? 1 : 0,
                            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />

                    {mainNavItems.map((item, index) => (
                        <NavButton
                            key={item.path}
                            item={item}
                            index={index}
                            isActive={index === activeIndex}
                        />
                    ))}
                </div>

                {/* Search Button - Separate Circle */}
                <button
                    onClick={() => navigate('/search')}
                    className="glass-strong rounded-full w-[70px] h-[70px] flex items-center justify-center bg-black/60 border-white/10 transition-all duration-300"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="8" stroke={isSearchActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m21 21-4.35-4.35" stroke={isSearchActive ? '#4BD883' : '#BFBFBF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;

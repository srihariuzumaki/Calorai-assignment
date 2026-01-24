import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import ProgressBar from '../components/ProgressBar';
import FoodCard from '../components/FoodCard';
import foodsData from '../data/foods.json';

const SwipeCard = ({ food, onSwipe, style, ...props }) => {
    const x = useMotionValue(0);
    const controls = useAnimation();

    // Rotate based on x position to simulate physics
    const rotate = useTransform(x, [-200, 200], [-30, 30]);

    // Opacity indicators for like/dislike overlays
    const heartOpacity = useTransform(x, [20, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

    const handleDragEnd = async (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > 100 || velocity > 500) {
            await controls.start({ x: 500, opacity: 0 });
            onSwipe('right');
        } else if (offset < -100 || velocity < -500) {
            await controls.start({ x: -500, opacity: 0 });
            onSwipe('left');
        } else {
            controls.start({ x: 0 });
        }
    };

    return (
        <motion.div
            style={{ x, rotate, ...style }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="absolute top-0 left-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
            {...props}
        >
            <FoodCard food={food} />

            {/* Like Overlay */}
            <motion.div
                style={{ opacity: heartOpacity }}
                className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-2 text-green-500 font-bold text-4xl -rotate-12 z-20 bg-black/20 backdrop-blur-sm"
            >
                LIKE
            </motion.div>

            {/* Nope Overlay */}
            <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-2 text-red-500 font-bold text-4xl rotate-12 z-20 bg-black/20 backdrop-blur-sm"
            >
                NOPE
            </motion.div>
        </motion.div>
    );
};

const SwipeScreen = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState(foodsData);
    const [swipedCount, setSwipedCount] = useState(0);
    const totalCards = foodsData.length;

    const handleSwipe = (direction, cardId) => {
        console.log(`Swiped ${direction} on card ${cardId}`);
        setSwipedCount(prev => prev + 1);

        // Remove card from stack
        setTimeout(() => {
            setCards(current => current.filter(c => c.id !== cardId));
        }, 200); // Wait for animation start to avoid flicker
    };

    const handleButtonSwipe = (direction) => {
        if (cards.length > 0) {
            const topCard = cards[0];
            handleSwipe(direction, topCard.id);
        }
    };

    useEffect(() => {
        if (cards.length === 0 && swipedCount > 0) {
            navigate('/results');
        }
    }, [cards, swipedCount, navigate]);

    // We only render the top few cards for performance
    const activeCards = cards.slice(0, 2).reverse();

    return (
        <div className="min-h-screen flex flex-col relative pb-[90px] overflow-hidden">
            {/* Top Bar */}
            <div className="pt-6 px-6 mb-4 flex items-center justify-between">
                <button onClick={() => navigate('/')} className="p-2 rounded-full glass hover:bg-white/10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <span className="font-semibold">Taste Profile</span>
                <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>

            {/* Progress */}
            <div className="px-6 mb-6">
                <ProgressBar current={swipedCount} total={totalCards} />
            </div>

            {/* Card Stack */}
            <div className="flex-1 px-4 relative flex items-center justify-center mb-4">
                <div className="relative w-full aspect-[3/4] max-h-[60vh]">
                    {activeCards.length > 0 ? activeCards.map((card, index) => (
                        <SwipeCard
                            key={card.id}
                            food={card}
                            onSwipe={(dir) => handleSwipe(dir, card.id)}
                            style={{ zIndex: index }}
                        />
                    )) : (
                        <div className="flex items-center justify-center h-full text-text-tertiary">
                            All done!
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 flex items-center justify-center gap-6 mb-4 max-w-[380px] mx-auto w-full">
                {/* Swipe Left - Red */}
                <button
                    onClick={() => handleButtonSwipe('left')}
                    className="flex flex-col items-center gap-2 transition-transform active:scale-95"
                >
                    <div className="w-14 h-14 rounded-full bg-[#F95341] flex items-center justify-center shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}>
                            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Swipe Left</span>
                </button>

                {/* Not Sure - Gray */}
                <button
                    onClick={() => handleButtonSwipe('unsure')}
                    className="flex flex-col items-center gap-2 transition-transform active:scale-95"
                >
                    <div className="w-12 h-12 rounded-full bg-[#333333] flex items-center justify-center shadow-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}>
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="white" strokeWidth="2" />
                            <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Not Sure</span>
                </button>

                {/* Super Like - Blue Gradient */}
                <button
                    onClick={() => handleButtonSwipe('super')}
                    className="flex flex-col items-center gap-2 transition-transform active:scale-95"
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#7843FF] to-[#4CC6FF] flex items-center justify-center shadow-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 3px rgba(0,145,255,0.8))' }}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#0091FF" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Super Like</span>
                </button>

                {/* Swipe Right - Green */}
                <button
                    onClick={() => handleButtonSwipe('right')}
                    className="flex flex-col items-center gap-2 transition-transform active:scale-95"
                >
                    <div className="w-14 h-14 rounded-full bg-[#4BD883] flex items-center justify-center shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}>
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Swipe Right</span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
};

export default SwipeScreen;

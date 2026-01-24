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
            <div className="px-8 flex items-center justify-between mb-4 max-w-[360px] mx-auto w-full">
                <Button variant="icon" className="!w-16 !h-16 !bg-black/40 !border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(249,83,65,0.2)]">
                    ✕
                </Button>
                <Button variant="secondary" className="!w-auto px-6 py-2 !rounded-full text-sm font-medium">
                    Unsure
                </Button>
                <Button variant="icon" className="!w-16 !h-16 !bg-black/40 !border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(75,216,131,0.2)]">
                    ♥
                </Button>
            </div>

            <BottomNav />
        </div>
    );
};

export default SwipeScreen;

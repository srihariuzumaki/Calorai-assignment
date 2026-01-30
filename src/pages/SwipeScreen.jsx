import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';
import ProgressBar from '../components/ProgressBar';
import FoodCard from '../components/FoodCard';
import foodsDataRaw from '../data/foods.json';
import SwipeButtons from '../components/SwipeButtons';
const foodsData = foodsDataRaw.foods;

const SwipeCard = ({ food, onSwipe, style, ...props }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const controls = useAnimation();

    // Rotate based on x position to simulate physics
    const rotate = useTransform(x, [-200, 200], [-30, 30]);

    // Opacity indicators for like/dislike overlays with dominant axis check
    const heartOpacity = useTransform([x, y], ([latestX, latestY]) => {
        if (Math.abs(latestX) > Math.abs(latestY) && latestX > 0) {
            return Math.min(1, Math.max(0, (latestX - 20) / 80));
        }
        return 0;
    });

    const nopeOpacity = useTransform([x, y], ([latestX, latestY]) => {
        if (Math.abs(latestX) > Math.abs(latestY) && latestX < 0) {
            return Math.min(1, Math.max(0, (-latestX - 20) / 80));
        }
        return 0;
    });

    const superLikeOpacity = useTransform([x, y], ([latestX, latestY]) => {
        if (Math.abs(latestY) > Math.abs(latestX) && latestY < 0) {
            return Math.min(1, Math.max(0, (-latestY - 20) / 80));
        }
        return 0;
    });

    const unsureOpacity = useTransform([x, y], ([latestX, latestY]) => {
        if (Math.abs(latestY) > Math.abs(latestX) && latestY > 0) {
            return Math.min(1, Math.max(0, (latestY - 20) / 80));
        }
        return 0;
    });

    const handleDragEnd = async (event, info) => {
        const offsetX = info.offset.x;
        const offsetY = info.offset.y;
        const velocityX = info.velocity.x;
        const velocityY = info.velocity.y;

        // Check vertical swipes first (up/down)
        if (Math.abs(offsetY) > Math.abs(offsetX)) {
            if (offsetY < -100 || velocityY < -500) {
                // Swipe up - Super Like
                await controls.start({ y: -500, opacity: 0 });
                onSwipe('super');
                return;
            } else if (offsetY > 100 || velocityY > 500) {
                // Swipe down - Unsure
                await controls.start({ y: 500, opacity: 0 });
                onSwipe('unsure');
                return;
            }
        }

        // Check horizontal swipes (left/right)
        if (offsetX > 100 || velocityX > 500) {
            await controls.start({ x: 500, opacity: 0 });
            onSwipe('right');
        } else if (offsetX < -100 || velocityX < -500) {
            await controls.start({ x: -500, opacity: 0 });
            onSwipe('left');
        } else {
            controls.start({ x: 0, y: 0 });
        }
    };

    // Handle initial animation for undone cards
    useEffect(() => {
        if (food.undoneDirection) {
            let initialX = 0;
            let initialY = 0;

            if (food.undoneDirection === 'right') initialX = 500;
            else if (food.undoneDirection === 'left') initialX = -500;
            else if (food.undoneDirection === 'super') initialY = -500;
            else if (food.undoneDirection === 'unsure') initialY = 500;

            x.set(initialX);
            y.set(initialY);

            controls.start({
                x: 0,
                y: 0,
                opacity: 1,
                transition: { type: 'spring', damping: 25, stiffness: 120 }
            });
        }
    }, [food.undoneDirection]);

    return (
        <motion.div
            style={{ x, y, rotate, ...style }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="absolute top-0 left-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
            {...props}
        >
            <FoodCard food={food} />

            {/* Like Overlay - Right (Positioned on top-right for swipe right) */}
            <motion.div
                style={{ opacity: heartOpacity }}
                className="absolute top-8 right-8 border-4 border-green-500 rounded-lg px-4 py-2 text-green-500 font-bold text-4xl -rotate-12 z-20 bg-black/20 backdrop-blur-sm"
            >
                LIKE
            </motion.div>

            {/* Nope Overlay - Left (Positioned on top-left for swipe left) */}
            <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute top-8 left-8 border-4 border-red-500 rounded-lg px-4 py-2 text-red-500 font-bold text-4xl rotate-12 z-20 bg-black/20 backdrop-blur-sm"
            >
                NOPE
            </motion.div>

            {/* Super Like Overlay - Up */}
            <motion.div
                style={{ opacity: superLikeOpacity }}
                className="absolute top-8 left-1/2 -translate-x-1/2 border-4 border-blue-500 rounded-lg px-4 py-2 text-blue-500 font-bold text-4xl z-20 bg-black/20 backdrop-blur-sm"
            >
                SUPER LIKE
            </motion.div>

            {/* Unsure Overlay - Down */}
            <motion.div
                style={{ opacity: unsureOpacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 border-4 border-gray-500 rounded-lg px-4 py-2 text-gray-500 font-bold text-4xl z-20 bg-black/20 backdrop-blur-sm"
            >
                UNSURE
            </motion.div>
        </motion.div>
    );
};

const SwipeScreen = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState(foodsData);
    const [lastSwiped, setLastSwiped] = useState(null);

    // Preload next images for smoother experience
    useEffect(() => {
        const preloadLimit = 5;
        // Find visible indexes (simple heuristic)
        const nextFoods = cards.slice(0, preloadLimit);

        nextFoods.forEach(food => {
            if (food.image && food.image.startsWith('http')) {
                const img = new Image();
                img.src = food.image;
            }
        });
    }, [cards]);

    const [swipedCount, setSwipedCount] = useState(0);
    const [swipeHistory, setSwipeHistory] = useState([]);
    const [preferences, setPreferences] = useState(() => {
        // Load from localStorage on mount
        const saved = localStorage.getItem('tastePreferences');
        return saved ? JSON.parse(saved) : {
            loved: [],
            hated: [],
            superLiked: [],
            unsure: []
        };
    });
    const totalCards = foodsData.length;

    const handleSwipe = (direction, cardId) => {
        console.log(`Swiped ${direction} on card ${cardId}`);

        const card = cards.find(c => c.id === cardId);
        if (card) {
            // Add to history for undo
            setSwipeHistory(prev => [...prev, { card, direction, timestamp: Date.now() }]);

            setPreferences(prev => {
                const newPrefs = { ...prev };
                if (direction === 'right' || direction === 'super') {
                    newPrefs.loved = [...prev.loved, card];
                    if (direction === 'super') {
                        newPrefs.superLiked = [...prev.superLiked, card];
                    }
                } else if (direction === 'left') {
                    newPrefs.hated = [...prev.hated, card];
                } else if (direction === 'unsure') {
                    newPrefs.unsure = [...prev.unsure, card];
                }
                // Save to localStorage immediately
                localStorage.setItem('tastePreferences', JSON.stringify(newPrefs));
                return newPrefs;
            });
        }

        setSwipedCount(prev => prev + 1);

        // Remove card from stack
        setTimeout(() => {
            setCards(current => current.filter(c => c.id !== cardId));
        }, 200); // Wait for animation start to avoid flicker
    };

    const handleUndo = () => {
        if (swipeHistory.length === 0) return;

        const lastSwipe = swipeHistory[swipeHistory.length - 1];
        const { card, direction } = lastSwipe;

        // Remove from history
        setSwipeHistory(prev => prev.slice(0, -1));

        // Restore card to stack with direction info for animation
        setCards(prev => [{ ...card, undoneDirection: direction }, ...prev]);

        // Remove from preferences
        setPreferences(prev => {
            const newPrefs = { ...prev };
            if (direction === 'right' || direction === 'super') {
                newPrefs.loved = prev.loved.filter(f => f.id !== card.id);
                if (direction === 'super') {
                    newPrefs.superLiked = prev.superLiked.filter(f => f.id !== card.id);
                }
            } else if (direction === 'left') {
                newPrefs.hated = prev.hated.filter(f => f.id !== card.id);
            } else if (direction === 'unsure') {
                newPrefs.unsure = prev.unsure.filter(f => f.id !== card.id);
            }
            localStorage.setItem('tastePreferences', JSON.stringify(newPrefs));
            return newPrefs;
        });

        // Decrease swipe count
        setSwipedCount(prev => prev - 1);
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
                <button onClick={() => navigate('/')} className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <h1 className="flex-1 text-center font-semibold text-lg">Taste Profile</h1>
                <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>

            {/* Progress Bar */}
            <div className="px-6 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{swipedCount} / {totalCards}</span>
                    <AnimatePresence mode="wait">
                        {swipeHistory.length > 0 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                key="undo-button"
                                onClick={handleUndo}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 active:scale-95"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 7v6h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-xs text-white font-medium">Undo</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
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
            <div className="px-4 mb-8">
                <SwipeButtons onSwipe={handleButtonSwipe} />
            </div>


            <BottomNav />
        </div>
    );
};

export default SwipeScreen;

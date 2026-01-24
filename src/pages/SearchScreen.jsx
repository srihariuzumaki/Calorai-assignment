import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foodsData from '../data/foods.json';
import GlassCard from '../components/GlassCard';
import BottomNav from '../components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const SearchScreen = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);

    const filteredFoods = foodsData.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFoodClick = (food) => {
        setSelectedFood(food);
    };

    return (
        <div className="min-h-screen flex flex-col relative pb-[90px]">
            {/* Header */}
            <div className="pt-8 px-6 mb-6">
                <h1 className="text-2xl font-bold text-white mb-4">Discover Foods</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for foods, cuisines..."
                        className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </div>
            </div>

            {/* Food Grid */}
            <div className="flex-1 px-6 overflow-y-auto pb-4 scrollbar-hide">
                <div className="grid grid-cols-2 gap-4">
                    {filteredFoods.map((food) => (
                        <motion.button
                            key={food.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFoodClick(food)}
                            className="text-left h-full"
                        >
                            <GlassCard className="p-4 h-full flex flex-col items-center text-center bg-black/40 border-white/10 hover:border-primary/30 transition-colors">
                                <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">{food.image}</div>
                                <h3 className="text-sm font-bold text-white mb-1 leading-tight">{food.name}</h3>
                                <div className="mt-auto">
                                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                                        {food.category}
                                    </span>
                                </div>
                            </GlassCard>
                        </motion.button>
                    ))}
                </div>
                {filteredFoods.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No foods found matching "{searchQuery}"
                    </div>
                )}
            </div>

            {/* Recipe Modal */}
            <AnimatePresence>
                {selectedFood && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedFood(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GlassCard strong className="flex-1 flex flex-col overflow-hidden p-0 border-white/20 shadow-2xl relative">
                                {/* Close Button - Top Right Floating */}
                                <button
                                    onClick={() => setSelectedFood(null)}
                                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-white/10 transition-colors border border-white/10"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Modal Header Banner */}
                                <div className="relative h-32 bg-gradient-to-br from-primary/20 via-black to-black border-b border-white/10 overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary blur-3xl opacity-20 scale-150"></div>
                                            <span className="text-7xl relative z-10 select-none">{selectedFood.image}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Title Area */}
                                <div className="px-6 pt-6 pb-2 text-center">
                                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-primary mb-1 bg-primary/10 px-2 py-0.5 rounded-full">
                                        {selectedFood.category}
                                    </span>
                                    <h2 className="text-2xl font-black text-white">{selectedFood.name}</h2>
                                </div>

                                {/* Modal Body */}
                                <div className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-hide">
                                    <div className="recipe-content">
                                        <ReactMarkdown>{selectedFood.recipe}</ReactMarkdown>
                                    </div>
                                </div>

                                {/* Start Cooking Button - Stick to bottom */}
                                <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
                                    <button
                                        onClick={() => setSelectedFood(null)}
                                        className="w-full py-3 rounded-xl bg-primary text-black font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
                                    >
                                        I'll Try This!
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNav />
        </div>
    );
};

export default SearchScreen;

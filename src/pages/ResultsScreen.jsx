import React, { useState, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import GlassCard from '../components/GlassCard';

const ResultsScreen = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const scrollContainerRef = useRef(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('tastePreferences');
    const preferences = savedPreferences
        ? JSON.parse(savedPreferences)
        : { loved: [], hated: [], superLiked: [], unsure: [] };

    // Get unique categories from loved foods
    const favoriteCuisines = [...new Set(preferences.loved.map(food => food.category))];

    const sections = [
        {
            title: "Foods You Love",
            subtitle: "We'll Recommend These",
            icon: "❤️",
            items: preferences.loved,
            color: "text-red-500"
        },
        {
            title: "Foods You Hate",
            subtitle: "We'll Avoid These",
            icon: "💔",
            items: preferences.hated,
            color: "text-red-400"
        },
        {
            title: "Favorite Cuisines",
            subtitle: "Your Top Picks",
            icon: "🍽️",
            items: favoriteCuisines.map(cat => ({ name: cat })),
            color: "text-yellow-500"
        },
        {
            title: "Super Liked",
            subtitle: "Your Absolute Favorites",
            icon: "⭐",
            items: preferences.superLiked,
            color: "text-blue-500"
        }
    ];

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const cardWidth = e.target.offsetWidth;
        const newSection = Math.round(scrollLeft / cardWidth);
        setCurrentSection(newSection);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        }

        if (isRightSwipe && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const scrollToSection = (sectionIndex) => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.offsetWidth;
            const targetScroll = cardWidth * sectionIndex;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const distance = Math.abs(targetScroll - currentScroll);

            // Calculate duration based on distance (slower for longer distances)
            const duration = Math.min(600, 300 + distance * 0.5);

            const startTime = performance.now();
            const startScroll = currentScroll;

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-in-out function for smooth animation
                const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                const newScroll = startScroll + (targetScroll - startScroll) * easeInOut;
                scrollContainerRef.current.scrollLeft = newScroll;

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    setCurrentSection(sectionIndex);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative pb-[80px] bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Header */}
            <div className="pt-8 px-6 mb-4">
                <h1 className="text-2xl font-bold text-white">Your Taste Profile</h1>
                <p className="text-sm text-gray-400 mt-1">Tailored to your unique needs. We'll use this for recommendations and menu plans</p>
            </div>

            {/* Key Highlights - Swipeable */}
            <div className="px-6 mb-4">
                <h2 className="text-sm font-semibold text-gray-400 mb-3">Key Highlights:</h2>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {preferences.loved.map((food, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[80px] snap-start">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-3xl mb-2 border border-white/10">
                                {food.image}
                            </div>
                            <span className="text-xs text-gray-300 text-center">{food.category}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lifestyle & Goals */}
            <div className="px-6 mb-4">
                <GlassCard className="p-4 bg-black/40">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-white">Lifestyle & Goals</span>
                    </div>
                    <p className="text-xs text-gray-400 ml-6">Eat less fast food, more salads & meal plan</p>

                    <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-white">Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-white">Gym-Goer</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-white">Walks a lot</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-white">PCOS & GI Diet</span>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Swipeable Sections */}
            <div className="flex-1 px-6 mb-4">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
                    onScroll={handleScroll}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="min-w-full snap-center">
                            <GlassCard className="p-6 bg-black/40 h-[400px] flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={section.color}>{section.icon}</span>
                                    <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                                </div>
                                <p className="text-xs text-gray-400 mb-4">{section.subtitle}</p>

                                <div className="flex-1 overflow-y-auto space-y-2">
                                    {section.items.length > 0 ? (
                                        section.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                                <span className="text-sm text-white">{item.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No items yet</p>
                                    )}
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mb-4">
                {sections.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSection ? 'bg-white' : 'bg-gray-600'
                            }`}
                    />
                ))}
            </div>

            <BottomNav />
        </div>
    );
};

export default ResultsScreen;

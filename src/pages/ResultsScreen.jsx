import React, { useState, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import GlassCard from '../components/GlassCard';
import { analyzePreferences, getFavoriteCuisines } from '../utils/profileAnalysis';
import { generateRecommendations } from '../utils/mealRecommendations';

const ResultsScreen = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const scrollContainerRef = useRef(null);
    const highlightsRef = useRef(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const scrollHighlights = (direction) => {
        if (highlightsRef.current) {
            const scrollAmount = 160;
            highlightsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('tastePreferences');
    const preferences = savedPreferences
        ? JSON.parse(savedPreferences)
        : { loved: [], hated: [], superLiked: [], unsure: [] };

    // Analyze preferences to generate insights
    const profile = analyzePreferences(preferences);
    const favoriteCuisines = getFavoriteCuisines(preferences.loved);
    const recommendations = generateRecommendations(preferences);

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
        setTouchEnd(0); // Reset touch end
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 75; // Increased threshold for better control
        const isRightSwipe = distance < -75;

        if (isLeftSwipe && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (isRightSwipe && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }

        // Reset
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
            const duration = Math.min(800, 400 + distance * 0.8); // Increased duration for smoother feel

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

                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft = newScroll;
                }

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
        <div className="min-h-screen flex flex-col relative pb-[80px]">
            {/* Header with Back Button */}
            <div className="pt-6 px-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Your Taste Profile</h1>
                </div>
                <p className="text-sm text-gray-400">Tailored to your unique needs. We'll use this for recommendations and menu plans</p>
            </div>

            {/* Key Highlights - Swipeable */}
            <div className="px-6 mb-4 relative group">
                <h2 className="text-sm font-semibold text-gray-400 mb-3">Key Highlights:</h2>

                <div
                    ref={highlightsRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {preferences.loved.map((food, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[80px] snap-start">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden text-3xl mb-2 border border-white/10">
                                {food.image.startsWith('http') ? (
                                    <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                                ) : (
                                    food.image
                                )}
                            </div>
                            <span className="text-xs text-gray-300 text-center">{food.category}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Personality Insights - AI Generated */}
            <div className="px-6 mb-4">
                <GlassCard className="p-5 bg-black/40">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🧠</span>
                        <h3 className="text-base font-semibold text-white">Your Taste Personality</h3>
                    </div>

                    {/* Profile Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-gray-400 mb-1">Diet Style</div>
                            <div className="text-sm font-semibold text-primary">{profile.dietStyle}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-gray-400 mb-1">Health Score</div>
                            <div className="text-sm font-semibold text-primary">{profile.healthScore}%</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-gray-400 mb-1">Adventurousness</div>
                            <div className="text-sm font-semibold text-primary">{profile.adventurousness}%</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-gray-400 mb-1">Top Category</div>
                            <div className="text-sm font-semibold text-primary">{profile.topCategory}</div>
                        </div>
                    </div>

                    {/* Insights */}
                    {profile.insights.length > 0 && (
                        <div className="space-y-2">
                            <div className="text-xs text-gray-400 mb-2">Key Insights:</div>
                            {profile.insights.map((insight, index) => (
                                <div key={index} className="flex items-start gap-2 bg-white/5 rounded-lg p-2 border border-white/5">
                                    <span className="text-lg flex-shrink-0">{insight.icon}</span>
                                    <div>
                                        <div className="text-xs font-semibold text-white">{insight.title}</div>
                                        <div className="text-xs text-gray-400">{insight.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </div>

            {/* Chef's Recommendations - Standout Feature */}
            {recommendations.length > 0 && (
                <div className="px-6 mb-6">
                    <h2 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                        <span>👨‍🍳</span> Chef's Recommendations
                    </h2>
                    <div className="space-y-4">
                        {recommendations.map((meal, index) => (
                            <GlassCard key={meal.id} className="p-4 bg-primary/5 border-primary/20">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{meal.icon}</span>
                                        <h3 className="text-sm font-bold text-white">{meal.name}</h3>
                                    </div>
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                                        {meal.calories} kcal
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-400 mb-2 leading-tight">{meal.description}</p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {meal.ingredients.map((ing, i) => (
                                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-md">
                                            {ing}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                                    <span className="text-[10px] text-primary font-bold">MATCH</span>
                                    <span className="text-[10px] text-gray-400 italic">{meal.matchReason}</span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )}

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
            <div className="flex-1 px-6 mb-4 relative group">
                {/* Section Navigation Arrows */}
                {currentSection > 0 && (
                    <button
                        onClick={() => scrollToSection(currentSection - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center shadow-2xl transition-all active:scale-90"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                {currentSection < sections.length - 1 && (
                    <button
                        onClick={() => scrollToSection(currentSection + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center shadow-2xl transition-all active:scale-90"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
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
                        <div
                            key={sectionIndex}
                            className="min-w-full snap-center"
                            style={{
                                opacity: currentSection === sectionIndex ? 1 : 0.7,
                                transform: currentSection === sectionIndex ? 'scale(1)' : 'scale(0.95)',
                                transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out'
                            }}
                        >
                            <div className="p-6 h-[400px] flex flex-col rounded-3xl glass-strong border border-white/10 shadow-2xl bg-black/40">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`${section.color} text-2xl`}>{section.icon}</span>
                                    <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                                </div>
                                <p className="text-xs text-gray-400 mb-4">{section.subtitle}</p>

                                <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                                    {section.items.length > 0 ? (
                                        section.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                                <span className="text-sm text-white">{item.name}</span>
                                                <span className="ml-auto text-[10px] text-gray-500">{item.category}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-sm text-gray-400">No items found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
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

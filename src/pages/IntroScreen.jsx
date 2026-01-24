import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';

const IntroScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative pb-[90px]">
            {/* Back Button */}
            <div className="pt-4 px-4">
                <button className="p-3 rounded-full glass hover:bg-white/10 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Title */}
            <div className="px-6 mt-2 mb-6">
                <h1 className="text-2xl font-bold text-white leading-tight">
                    Design Your Food Plan
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 px-4 flex items-center justify-center">
                <GlassCard strong className="w-full max-w-sm p-8 flex flex-col items-center text-center space-y-6 bg-black/40 border-white/10">

                    {/* Emoji with glow effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                        <div className="relative text-7xl">
                            😋
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-2xl font-bold text-white leading-tight">
                        Build Your Taste Profile
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Swipe right on foods you love, left on foods you don't.
                    </p>

                    {/* Additional Info */}
                    <p className="text-gray-400 text-xs leading-relaxed">
                        This helps us recommend meals you'll love eating.
                    </p>

                    {/* CTA Button */}
                    <Button
                        variant="primary"
                        onClick={() => navigate('/swipe')}
                        className="!bg-primary !text-black font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                    >
                        Start Swiping
                    </Button>

                    {/* Time estimate */}
                    <p className="text-gray-500 text-xs">
                        Takes about 2 minutes.
                    </p>
                </GlassCard>
            </div>

            <BottomNav />
        </div>
    );
};

export default IntroScreen;

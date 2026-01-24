import React from 'react';
import BottomNav from '../components/BottomNav';
import GlassCard from '../components/GlassCard';

const ResultsScreen = () => {
    return (
        <div className="min-h-screen flex flex-col relative pb-[90px] overflow-hidden">
            {/* Header */}
            <div className="pt-12 px-6 mb-8 text-center">
                <h1 className="text-white mb-2 leading-tight">
                    Build Your<br />
                    <span className="text-primary font-normal">Taste Profile</span>
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 flex flex-col gap-4 animate-slide-up">
                {/* Placeholder for "I've eaten all salads" card from Figma */}
                <GlassCard className="flex items-center gap-4 relative overflow-hidden group">
                    <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                        🥗
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Salad Specialist</h3>
                        <p className="text-text-secondary text-sm">You liked 80% of salads!</p>
                    </div>

                    {/* Decorative glint */}
                    <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 opacity-50"></div>
                </GlassCard>

                {/* Placeholder Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <GlassCard className="flex flex-col items-center justify-center p-4">
                        <span className="text-3xl mb-2">🔥</span>
                        <span className="text-sm text-text-secondary">Spicy Lover</span>
                    </GlassCard>
                    <GlassCard className="flex flex-col items-center justify-center p-4">
                        <span className="text-3xl mb-2">🍭</span>
                        <span className="text-sm text-text-secondary">Sweet Tooth</span>
                    </GlassCard>
                </div>

                <GlassCard strong className="mt-4 p-6 text-center">
                    <h2 className="text-xl font-bold mb-2">Profile Completeness</h2>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(75,216,131,0.5)]"></div>
                    </div>
                    <p className="text-primary mt-2 font-mono">85%</p>
                </GlassCard>
            </div>

            <BottomNav />
        </div>
    );
};

export default ResultsScreen;

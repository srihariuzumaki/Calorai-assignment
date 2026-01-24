import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import BottomNav from '../components/BottomNav';

const IntroScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col relative pb-[90px]">
            {/* Header/Title Area */}
            <div className="pt-12 px-6 mb-8 text-center animate-fade-in">
                <h1 className="text-white mb-2 leading-tight">
                    Designing<br />
                    <span className="text-text-secondary font-normal">Your Food Plan</span>
                </h1>
                <p className="text-text-tertiary mt-2">
                    Help us build your taste profile
                </p>
            </div>

            {/* Main Card Area */}
            <div className="flex-1 px-4 flex flex-col justify-center animate-slide-up">
                <GlassCard className="w-full aspect-[4/5] flex flex-col items-center justify-between mb-6 relative overflow-hidden group">

                    {/* Decorative Circles/Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[60px] animate-pulse-slow"></div>

                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full">
                        <h2 className="text-3xl font-bold mb-4">
                            Build Your<br />
                            <span className="text-primary">Taste Profile</span>
                        </h2>
                        <div className="text-6xl mb-6">👅</div>
                        <p className="text-text-secondary max-w-[260px] leading-relaxed">
                            Swipe right on foods you love, left on ones you don't.
                        </p>
                    </div>

                    <div className="w-full relative z-10">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/swipe')}
                            className="shadow-[0_0_20px_rgba(75,216,131,0.3)]"
                        >
                            Start Swiping
                        </Button>
                    </div>
                </GlassCard>
            </div>

            <BottomNav />
        </div>
    );
};

export default IntroScreen;

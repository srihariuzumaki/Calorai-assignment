import React from 'react';
import GlassCard from './GlassCard';

const FoodCard = ({ food, style = {} }) => {
    if (!food) return null;

    return (
        <div
            className="relative w-full h-full rounded-[34px] overflow-hidden shadow-2xl"
            style={style}
        >
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                {/* Placeholder for food image since we don't have real assets yet */}
                <span className="text-[120px] filter drop-shadow-lg animate-pulse-slow">
                    {food.image}
                </span>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-12">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                    {food.name}
                </h2>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/10">
                        {food.category}
                    </span>
                    <span className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-sm font-medium text-primary border border-primary/10">
                        150 kcal
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;

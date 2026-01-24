import React from 'react';

const FoodCard = ({ food, style = {} }) => {
    if (!food) return null;

    return (
        <div
            className="relative w-full h-full rounded-[34px] overflow-hidden shadow-2xl"
            style={style}
        >
            {/* Glassmorphism Card Background */}
            <div className="absolute inset-0 glass-strong bg-gradient-to-b from-gray-900/40 to-black/60 backdrop-blur-xl border border-white/10">

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    {/* Food Image/Emoji */}
                    <div className="mb-6 bg-white/90 rounded-full p-6 shadow-xl">
                        <span className="text-6xl filter drop-shadow-lg">
                            {food.image}
                        </span>
                    </div>

                    {/* Text */}
                    <h2 className="text-2xl font-semibold text-white drop-shadow-md">
                        I love eating {food.name.toLowerCase()}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;

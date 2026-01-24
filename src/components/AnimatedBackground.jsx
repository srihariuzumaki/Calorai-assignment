import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

            {/* Animated gradient overlay - Faster and more visible */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 20% 50%, rgba(75, 216, 131, 0.25) 0%, transparent 50%)',
                }}
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(75, 216, 131, 0.25) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 20%, rgba(75, 216, 131, 0.25) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(120, 67, 255, 0.25) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 80%, rgba(76, 198, 255, 0.25) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(75, 216, 131, 0.25) 0%, transparent 50%)',
                    ]
                }}
                transition={{
                    duration: 6,  // Faster: 10s → 6s
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Floating orb 1 - Green - Larger and faster */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full opacity-40"
                style={{
                    background: 'radial-gradient(circle, rgba(75, 216, 131, 0.4) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    top: '5%',
                    left: '5%',
                }}
                animate={{
                    x: [0, 150, 0],
                    y: [0, 200, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 8,  // Faster: 15s → 8s
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Floating orb 2 - Purple - Larger and faster */}
            <motion.div
                className="absolute w-[450px] h-[450px] rounded-full opacity-35"
                style={{
                    background: 'radial-gradient(circle, rgba(120, 67, 255, 0.4) 0%, transparent 70%)',
                    filter: 'blur(70px)',
                    top: '55%',
                    right: '5%',
                }}
                animate={{
                    x: [0, -120, 0],
                    y: [0, -150, 0],
                    scale: [1, 1.4, 1],
                }}
                transition={{
                    duration: 7,  // Faster: 12s → 7s
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Floating orb 3 - Blue - Larger and faster */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(76, 198, 255, 0.4) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    bottom: '15%',
                    left: '45%',
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, -120, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 9,  // Faster: 18s → 9s
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

export default AnimatedBackground;

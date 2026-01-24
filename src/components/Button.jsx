import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    icon,
    ...props
}) => {
    const baseStyles = "relative overflow-hidden font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center";

    const variants = {
        primary: "bg-primary text-black hover:bg-opacity-90 shadow-lg shadow-primary/20",
        secondary: "bg-[#333333] text-white hover:bg-opacity-90",
        glass: "glass text-white hover:bg-white/10 border border-white/10",
        icon: "rounded-full p-4 glass hover:bg-white/10 border border-white/10"
    };

    const sizeStyles = variant === 'icon' ? "w-16 h-16" : "w-full py-4 rounded-xl";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${className}`}
            {...props}
        >
            {icon && <span className="mr-2 text-xl">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;

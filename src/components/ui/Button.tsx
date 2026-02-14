"use client";

import { ReactNode, MouseEventHandler } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
}

/**
 * Button component with variants, loading state, and hover effects.
 * Primary variant features a pink gradient matching the pastel aesthetic.
 *
 * Validates: Requirements 1.4
 */
export function Button({
    children,
    variant = "primary",
    isLoading = false,
    disabled = false,
    className = "",
    onClick,
    type = "button",
}: ButtonProps) {
    const isDisabled = disabled || isLoading;

    const baseStyles = `
        relative
        px-8
        py-3
        rounded-full
        font-medium
        text-base
        transition-all
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-pink-300
        focus:ring-offset-2
    `;

    const variantStyles: Record<ButtonVariant, string> = {
        primary: `
            bg-gradient-to-r
            from-pink-400
            to-pink-500
            text-white
            shadow-lg
            shadow-pink-300/40
            hover:from-pink-500
            hover:to-pink-600
            hover:shadow-xl
            hover:shadow-pink-400/50
            hover:scale-105
            active:scale-95
        `,
        secondary: `
            bg-white/80
            text-pink-500
            border
            border-pink-200
            hover:bg-pink-50
            hover:border-pink-300
            active:scale-95
        `,
    };

    const disabledStyles = `
        opacity-50
        cursor-not-allowed
        hover:scale-100
        hover:shadow-lg
    `;

    return (
        <motion.button
            whileHover={!isDisabled ? { scale: 1.05 } : undefined}
            whileTap={!isDisabled ? { scale: 0.95 } : undefined}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${isDisabled ? disabledStyles : "cursor-pointer"}
                ${className}
            `.trim()}
            disabled={isDisabled}
            onClick={onClick}
            type={type}
        >
            {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner />
                </span>
            )}
            <span className={isLoading ? "invisible" : ""}>{children}</span>
        </motion.button>
    );
}

function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

export default Button;

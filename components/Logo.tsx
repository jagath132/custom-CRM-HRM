import React from 'react';

interface LogoProps {
    className?: string;
    size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="none"
            className={className}
            width={size}
            height={size}
        >
            <defs>
                <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
            </defs>

            <rect width="512" height="512" rx="128" fill="url(#nexusGradient)" />

            <path d="M160 380V132L352 380V132" stroke="white" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

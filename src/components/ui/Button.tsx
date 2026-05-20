'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center tracking-[0.15em] uppercase transition-all duration-500 relative overflow-hidden group';

  const variants: Record<string, string> = {
    primary:
      'bg-[#C8A97E] text-[#0A0A0A] hover:bg-[#E8D5B5] active:bg-[#A68B5B]',
    secondary:
      'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20',
    ghost:
      'bg-transparent text-white/60 hover:text-white',
    outline:
      'bg-transparent border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#0A0A0A]',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-10 py-4 text-sm',
  };

  const disabledStyles = disabled
    ? 'opacity-30 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      )}
    </motion.button>
  );
}

'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0000EE] text-white hover:bg-[#0055FF] active:bg-[#0000CC] disabled:bg-[#E8E8E8] disabled:text-[#999]',
  secondary:
    'bg-white text-[#0000EE] border border-[#EFEFEF] hover:bg-[#F0F0F0] active:bg-[#E0E0E0] disabled:bg-[#E8E8E8] disabled:text-[#999]',
  ghost:
    'bg-transparent text-[#0000EE] hover:opacity-80 active:text-[#0055FF] disabled:text-[#999]',
  gold:
    'bg-gradient-to-r from-[#C8A97E] to-[#A68B5B] text-white hover:from-[#A68B5B] hover:to-[#8B7249] active:from-[#8B7249] active:to-[#6E5A3A]',
  icon:
    'bg-white/10 text-current hover:bg-white/20 active:bg-white/30 disabled:bg-white/5 disabled:opacity-50 rounded-full',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs h-7',
  md: 'px-5 py-2 text-sm h-10',
  lg: 'px-8 py-3 text-base h-12',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-medium rounded-[15px] transition-colors duration-200 cursor-pointer select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000EE]',
        variantStyles[variant],
        variant !== 'icon' && sizeStyles[size],
        variant === 'icon' && 'w-10 h-10 p-0',
        fullWidth && 'w-full',
        (disabled || loading) && 'pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}

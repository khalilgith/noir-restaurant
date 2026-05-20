'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  glass?: boolean;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingMap = {
  sm: 'p-3',
  md: 'p-4 md:p-5',
  lg: 'p-6 md:p-8',
};

export default function Card({
  children,
  className,
  dark = false,
  glass = false,
  hover = true,
  padding = 'md',
  onClick,
}: CardProps) {
  const base = glass
    ? 'glass shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
    : dark
    ? 'bg-[#1A1A1A] border border-[#242424] text-white'
    : 'bg-white border border-[#EFEFEF] text-black';

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'rounded-lg overflow-hidden transition-colors duration-200',
        base,
        paddingMap[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

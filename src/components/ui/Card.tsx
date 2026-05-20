import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/[0.03] border border-white/[0.06] rounded-sm ${hover ? 'hover:border-[#C8A97E]/20 hover:bg-white/[0.05]' : ''} transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

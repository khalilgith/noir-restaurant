'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded h-4',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      style={{ width, height }}
    />
  );
}

export function MenuCardSkeleton() {
  return (
    <div className="rounded-lg border border-[#EFEFEF] p-5 space-y-4">
      <Skeleton height={200} className="w-full" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" width={60} height={24} />
        <Skeleton variant="rectangular" width={100} height={36} className="rounded-[15px]" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="rounded-lg border border-[#EFEFEF] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="space-y-2">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </div>
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />
    </div>
  );
}

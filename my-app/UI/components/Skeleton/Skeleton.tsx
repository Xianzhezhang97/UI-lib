import { cn } from '@/utils/cn';
import React from 'react';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';
type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  isLoaded?: boolean;
  fadeDuration?: number;
  speed?: number;
  startColor?: string;
  endColor?: string;
}

const sizeStyles = {
  xs: 'h-2',
  sm: 'h-3',
  md: 'h-4',
  lg: 'h-6',
  xl: 'h-8',
};

const variantStyles = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  size = 'md',
  isLoaded = false,
  fadeDuration = 0.2,
  speed = 1,
  startColor = 'from-gray-200',
  endColor = 'to-gray-300',
  className,
  children,
  ...props
}) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        sizeStyles[size],
        variantStyles[variant],
        'bg-gradient-to-r',
        startColor,
        endColor,
        'animate-shimmer',
        className,
      )}
      style={{
        animationDuration: `${speed}s`,
      }}
      {...props}
    >
      <div
        className='absolute inset-0 -translate-x-full animate-shimmer'
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animationDuration: `${speed}s`,
        }}
      />
    </div>
  );
};

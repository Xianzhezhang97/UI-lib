import { cn } from '@/utils/cn';
import React from 'react';
import './skeleton.css';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'chart' | 'image' | 'card' | 'list' | 'article';
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
  chart: 'rounded-lg',
  image: 'rounded-lg',
  card: 'rounded-lg',
  list: 'rounded-lg',
  article: 'rounded-lg',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  size = 'md',
  isLoaded = false,
  fadeDuration = 0.2,
  speed = 0.6,
  startColor = 'from-gray-200',
  endColor = 'to-gray-300',
  className,
  children,
  ...props
}) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  // Extract color values from Tailwind classes
  const startColorValue = startColor.replace('from-', 'bg-');
  const endColorValue = endColor.replace('to-', 'bg-');

  const variantClass = `skeleton-${variant}`;

  return (
    <div
      className={cn(
        'skeleton-base',
        sizeStyles[size],
        variantStyles[variant],
        startColorValue,
        variantClass,
        className,
      )}
      {...props}
    >
      {/* Animation overlay */}
      <div 
        className='skeleton-shimmer'
        style={{
          animationDuration: `${speed * 1.5}s`
        }}
      />
    </div>
  );
};

// 骨架屏组合
export const SkeletonGroup = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  );
};

// 骨架屏布局
export const SkeletonLayout = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)} {...props}>
      {children}
    </div>
  );
};

// 骨架屏卡片
export const SkeletonCard = ({
  title,
  description,
  className,
  ...props
}: {
  title?: boolean;
  description?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn('skeleton-card', className)} {...props}>
      {title && <Skeleton variant="text" size="lg" className="w-3/4 mb-2" />}
      {description && (
        <>
          <Skeleton variant="text" size="md" className="w-2/3 mb-2" />
          <Skeleton variant="text" size="md" className="w-1/2" />
        </>
      )}
    </div>
  );
};

// 骨架屏列表项
export const SkeletonListItem = ({
  avatar,
  title,
  description,
  className,
  ...props
}: {
  avatar?: boolean;
  title?: boolean;
  description?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn('skeleton-list-item flex items-center space-x-4 p-4', className)} {...props}>
      {avatar && <Skeleton variant="circular" size="md" className="w-10 h-10" />}
      <div className="flex-1">
        {title && <Skeleton variant="text" size="md" className="w-3/4 mb-2" />}
        {description && <Skeleton variant="text" size="sm" className="w-1/2" />}
      </div>
    </div>
  );
};



interface SkeletonImageProps extends SkeletonProps {
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'custom';
  customRatio?: string; // e.g. "16/9"
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  variant = 'image',
  aspectRatio = 'square',
  customRatio,
  className,
  ...props
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[9/16]',
    custom: customRatio ? `aspect-[${customRatio}]` : 'aspect-square'
  };

  return (
    <Skeleton
      variant={variant}
      className={cn(
        aspectRatioClasses[aspectRatio],
        'w-full',
        className
      )}
      {...props}
    />
  );
};

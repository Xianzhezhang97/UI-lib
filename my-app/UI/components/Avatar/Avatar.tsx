import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface AvatarProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  bordered?: boolean;
  ring?: boolean;
  ringColor?: string;
}

const sizeStyles = {
  sm: {
    container: 'h-8 w-8',
    text: 'text-xs',
  },
  md: {
    container: 'h-10 w-10',
    text: 'text-sm',
  },
  lg: {
    container: 'h-12 w-12',
    text: 'text-base',
  },
  xl: {
    container: 'h-16 w-16',
    text: 'text-lg',
  },
};

const statusStyles = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      size = 'md',
      name,
      status,
      bordered = false,
      ring = false,
      ringColor = 'ring-primary-500',
      ...props
    },
    ref
  ) => {
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    };

    return (
      <div className="relative inline-block">
        <motion.div
          ref={ref}
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-full bg-gray-100',
            sizeStyles[size].container,
            bordered && 'border-2 border-white',
            ring && `ring-2 ${ringColor}`,
            className
          )}
          {...props}
        >
          {src ? (
            <img
              src={src}
              alt={alt || name}
              className="h-full w-full object-cover"
            />
          ) : name ? (
            <span
              className={cn(
                'font-medium text-gray-600',
                sizeStyles[size].text
              )}
            >
              {getInitials(name)}
            </span>
          ) : (
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </motion.div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white',
              statusStyles[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar'; 
import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

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
    container: 'h-8 w-8 md:h-12 md:w-12',
    text: 'text-xs',
  },
  md: {
    container: 'h-8 w-8 md:h-14 md:w-14 lg:h-16 lg:w-16',
    text: 'text-sm',
  },
  lg: {
    container: 'h-10 w-10 md:h-16 md:w-16 lg:h-20 lg:w-20',
    text: 'text-base',
  },
  xl: {
    container: 'h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24',
    text: 'text-lg',
  },
};

const statusStyles = {
  online: 'bg-gradient-to-br from-green-500 to-green-300',
  offline: 'bg-gradient-to-br from-gray-500 to-gray-300',
  away: 'bg-gradient-to-br from-yellow-500 to-yellow-300',
  busy: 'bg-gradient-to-br from-red-500 to-red-300',
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
              'absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white',
              statusStyles[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar'; 
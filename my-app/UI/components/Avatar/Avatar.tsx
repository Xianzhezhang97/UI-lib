import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { getColorFromName } from './util/getColorFromString';
import getContrastTextColor from './util/getContrastTextColor';

export interface AvatarProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  bordered?: boolean;
  ring?: boolean;
  customSize?: string;
  ringColor?: string;
  message?: number;
}

const sizeStyles = {
  sm: {
    container: 'h-12 w-12 md:h-14 md:w-14',
    text: 'text-md ',
  },
  md: {
    container: 'h-12 w-12 md:h-16 md:w-16 lg:h-16 lg:w-16',
    text: 'text-md md:text-lg ',
  },
  lg: {
    container: 'h-12 w-12 md:h-18 md:w-18 lg:h-20 lg:w-20',
    text: 'text-md md:text-lg lg:text-xl',
  },
  xl: {
    container: 'h-12 w-12 md:h-20 md:w-20 lg:h-22 lg:w-22 xl:h-24 xl:w-24',
    text: 'text-md md:text-lg lg:text-xl xl:text-xl',
  },
  custom: {
    container: '',
    text: 'text-md md:text-lg lg:text-xl xl:text-xl',
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
      message,
      customSize,
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
          ref={ ref }
          style={ {
            backgroundColor: (name && !src) ? getColorFromName(name) : undefined,
          }}
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-full ',
            size && !customSize &&sizeStyles[ size ].container,
            customSize && customSize,
            !src && 'bg-gray-100',
            name && `text-${getContrastTextColor(getColorFromName(name))}`,
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
              className={cn(
                'h-full w-full flex object-cover',
                customSize && customSize,
              )}
            />
          ) : name ? (
            <span
              className={cn(
                'font-medium text-center',
                sizeStyles[size].text,
                customSize && customSize,
                name && `text-${getContrastTextColor(getColorFromName(name))}`,
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
        {message && (
   <span className="absolute xl:-top-[8px] xl:-right-[8px] md:-top-[6px] md:-right-[6px] -top-[12px] -right-[12px]">
  <div
    className={cn(
      'border-2 border-white inline-flex ',
      'bg-gradient-to-r from-red-500 to-red-300 flex items-center justify-center',
      'h-5 px-1 ', // 高度固定，宽度最小，超出自动撑开
      'rounded-full' // 关键：圆形/椭圆通吃
    )}
  >
    <div className="px-1 text-white text-xs font-semibold text-center">{message<100? message: '99+'}</div> 
  </div>
</span>

        )}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 xl:h-4 xl:w-4 lg:h-3.5 lg:w-3.5 md:h-3.5 md:w-3.5 h-2 w-2 rounded-full border-2 border-white',
              statusStyles[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar'; 
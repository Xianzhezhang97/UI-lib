import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'full'
    | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantStyles = {
  primary: `
    bg-primary-700 
    text-white 
    hover:bg-primary-500 
    active:bg-primary-600 
    transition-all 
    rounded-full
  `,

  secondary: `
    bg-primary-100 
    text-primary-700 
    hover:bg-primary-200 
    active:bg-primary-300 
    rounded-full 
    transition-all
  `,

  outline: `
    border border-primary-500 
    text-primary-500 
    hover:bg-primary-500
    hover:text-white
    active:bg-primary-100 
    rounded-full 
    transition-all
  `,

  ghost: `
    text-primary-600 
    hover:bg-primary-50 
    active:bg-primary-100 
    rounded-full 
    transition-all
  `,

  link: `
    text-primary-600 
    underline-offset-4 
    hover:underline 
    hover:text-primary-700 
    rounded-full
  `,

  full: `
    w-full 
    bg-primary-500 
    text-white 
    hover:bg-primary-600 
    active:bg-primary-700 
    rounded-full 
    transition-all
  `,

  icon: `
    w-10 h-10 
    rounded-full 
    transition-all
  `,
};

const sizeStyles = {
  sm: `
    px-4 py-1.5 
    text-sm 
    rounded-full
    h-8 min-w-[96px]
    sm:text-sm 
    sm:px-3 sm:py-1
  `,

  md: `
    px-6 py-2 
    text-base
    h-10 min-w-[96px]
    rounded-full 
    sm:px-4 sm:py-2
    sm:text-sm
  `,

  lg: `
    px-8 py-3 
    text-lg 
    h-12 min-w-[96px] 
    flex items-center justify-center 
    sm:px-6 sm:py-2.5 
    sm:text-base
  `,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !isLoading && onClick) {
        onClick(event);
      }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 justify-center font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className,
        )}
        disabled={disabled || isLoading}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading && (
          <svg
            className='mr-2 h-4 w-4 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className=''>{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className=''>{rightIcon}</span>}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

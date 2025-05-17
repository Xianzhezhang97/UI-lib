import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface InputProps extends Omit<HTMLMotionProps<'input'>, 'children' | 'size' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

const sizeStyles = {
  sm: {
    input: 'px-3 py-1.5 text-sm',
    label: 'text-sm',
  },
  md: {
    input: 'px-4 py-2 text-base',
    label: 'text-base',
  },
  lg: {
    input: 'px-6 py-3 text-lg',
    label: 'text-lg',
  },
};

const variantStyles = {
  outline: 'border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  filled: 'bg-gray-100 border-2 border-transparent focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  flushed: 'border-b-2 border-gray-300 focus:border-primary-500 rounded-none px-0',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftElement,
      rightElement,
      fullWidth = false,
      size = 'md',
      variant = 'outline',
      value,
      onChange,
      onBlur,
      onFocus,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const [isComposing, setIsComposing] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isComposing) {
        onChange?.(event);
      }
    };

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = (event: React.CompositionEvent<HTMLInputElement>) => {
      setIsComposing(false);
      // onChange?.(event);  
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'select-none font-medium text-gray-700',
              sizeStyles[size].label,
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftElement}
            </div>
          )}
          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg bg-white font-medium text-gray-900 transition-colors placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              sizeStyles[size].input,
              variantStyles[variant],
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
              fullWidth && 'w-full',
              className
            )}
            value={value}
            onChange={handleChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            whileFocus={{ scale: 1.01 }}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {rightElement}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              'text-sm',
              error ? 'text-danger-500' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '~/utils/cn';

export interface RadioProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  value?: string;
  required?: boolean;
  variant?: 'default' | 'card';
}

const sizeStyles = {
  sm: {
    radio: 'w-4 h-4',
    dot: 'w-2 h-2',
    label: 'text-sm',
    card: 'p-2',
  },
  md: {
    radio: 'w-5 h-5',
    dot: 'w-2.5 h-2.5',
    label: 'text-base',
    card: 'p-3',
  },
  lg: {
    radio: 'w-6 h-6',
    dot: 'w-3 h-3',
    label: 'text-lg',
    card: 'p-4',
  },
};

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      checked = false,
      onChange,
      disabled = false,
      size = 'md',
      name,
      value,
      required,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const radioId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!disabled && value) {
          onChange?.(value);
          inputRef.current?.click();
        }
      }
    };

    if (variant === 'card') {
      return (
        <div className="flex flex-col gap-1.5">
          <motion.div
            ref={ref}
            className={cn(
              'relative flex cursor-pointer items-center justify-between rounded-lg border-2 transition-all',
              sizeStyles[size].card,
              checked
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-gray-300',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'border-danger-500',
              className
            )}
            onClick={() => !disabled && value && onChange?.(value)}
            onKeyDown={handleKeyDown}
            role="radio"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            whileTap={{ scale: 0.98 }}
            {...props}
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'relative flex items-center justify-center rounded-full border-2 transition-colors',
                  sizeStyles[size].radio,
                  checked
                    ? 'border-primary-500'
                    : 'border-gray-300',
                  disabled && 'cursor-not-allowed opacity-50',
                  error && 'border-danger-500'
                )}
              >
                <motion.div
                  className={cn(
                    'rounded-full bg-primary-500',
                    sizeStyles[size].dot
                  )}
                  initial={false}
                  animate={{
                    scale: checked ? 1 : 0,
                    opacity: checked ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              {label && (
                <span
                  className={cn(
                    'select-none font-medium text-gray-700',
                    sizeStyles[size].label,
                    disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {label}
                  {required && <span className="text-danger-500 ml-1">*</span>}
                </span>
              )}
            </div>
            <input
              ref={inputRef}
              type="radio"
              id={radioId}
              name={name}
              value={value}
              checked={checked}
              onChange={(e) => !disabled && value && onChange?.(value)}
              disabled={disabled}
              required={required}
              className="sr-only"
            />
          </motion.div>
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

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <motion.div
            ref={ref}
            className={cn(
              'relative flex cursor-pointer items-center justify-center rounded-full border-2 transition-colors',
              sizeStyles[size].radio,
              checked
                ? 'border-primary-500'
                : 'border-gray-300',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'border-danger-500',
              className
            )}
            onClick={() => !disabled && value && onChange?.(value)}
            onKeyDown={handleKeyDown}
            role="radio"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            whileTap={{ scale: 0.95 }}
            {...props}
          >
            <motion.div
              className={cn(
                'rounded-full bg-primary-500',
                sizeStyles[size].dot
              )}
              initial={false}
              animate={{
                scale: checked ? 1 : 0,
                opacity: checked ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <input
              ref={inputRef}
              type="radio"
              id={radioId}
              name={name}
              value={value}
              checked={checked}
              onChange={(e) => !disabled && value && onChange?.(value)}
              disabled={disabled}
              required={required}
              className="sr-only"
            />
          </motion.div>
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'select-none font-medium text-gray-700',
                sizeStyles[size].label,
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
              {required && <span className="text-danger-500 ml-1">*</span>}
            </label>
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

Radio.displayName = 'Radio'; 
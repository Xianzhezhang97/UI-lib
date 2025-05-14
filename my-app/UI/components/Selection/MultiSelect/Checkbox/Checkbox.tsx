import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../../../utils/cn';
import { CheckIcon } from '@heroicons/react/24/outline';

export interface CheckboxProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  value?: string;
  required?: boolean;
  variant?: 'default' | 'card';
}

const sizeStyles = {
  sm: {
    checkbox: 'w-4 h-4',
    icon: 'h-3 w-3',
    label: 'text-sm',
  },
  md: {
    checkbox: 'w-5 h-5',
    icon: 'h-4 w-4',
    label: 'text-base',
  },
  lg: {
    checkbox: 'w-6 h-6',
    icon: 'h-5 w-5',
    label: 'text-lg',
  },
};

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
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
    const checkboxId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleChange = (newChecked: boolean) => {
      if (!disabled) {
        setIsChecked(newChecked);
        onChange?.(newChecked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleChange(!isChecked);
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <motion.div
            ref={ref}
            className={cn(
              'relative flex cursor-pointer items-center justify-center rounded-md border-2 transition-colors',
              sizeStyles[size].checkbox,
              isChecked
                ? 'border-primary-500 bg-primary-500'
                : 'border-gray-300 bg-white',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'border-danger-500',
              className
            )}
            onClick={() => handleChange(!isChecked)}
            onKeyDown={handleKeyDown}
            role="checkbox"
            aria-checked={isChecked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            whileTap={{ scale: 0.95 }}
            {...props}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isChecked ? 1 : 0,
                opacity: isChecked ? 1 : 0,
              }}
              transition={{ duration: 0.15 }}
            >
              <CheckIcon
                className={cn(
                  'text-white',
                  sizeStyles[size].icon
                )}
              />
            </motion.div>
            <input
              ref={inputRef}
              type="checkbox"
              id={checkboxId}
              name={name}
              value={value}
              checked={isChecked}
              onChange={(e) => handleChange(e.target.checked)}
              disabled={disabled}
              required={required}
              className="sr-only"
            />
          </motion.div>
          {label && (
            <label
              htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox'; 
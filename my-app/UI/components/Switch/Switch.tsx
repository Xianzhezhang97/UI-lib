import { cn } from '@/UI/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface SwitchProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onChange'> {
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
}

const sizeStyles = {
  sm: {
    switch: 'w-9 h-5',
    thumb: 'w-4 h-4',
    label: 'text-sm',
  },
  md: {
    switch: 'w-11 h-6',
    thumb: 'w-5 h-5',
    label: 'text-base',
  },
  lg: {
    switch: 'w-14 h-7',
    thumb: 'w-6 h-6',
    label: 'text-lg',
  },
};

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
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
      ...props
    },
    ref
  ) => {
    const switchId = React.useId();
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <motion.div
            ref={ref}
            className={cn(
              'flex items-center rounded-full p-0.5 transition-colors',
              sizeStyles[size].switch,
              isChecked
                ? 'justify-end bg-primary-500'
                : 'justify-start bg-gray-200',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'bg-danger-500',
              className
            )}
            onClick={() => handleChange(!isChecked)}
            onKeyDown={handleKeyDown}
            role="switch"
            aria-checked={isChecked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            whileTap={{ scale: 0.95 }}
            {...props}
          >
            <motion.div
              className={cn(
                'rounded-full bg-white shadow-sm',
                sizeStyles[size].thumb
              )}
              layout
            />
            <input
              ref={inputRef}
              type="checkbox"
              id={switchId}
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
              htmlFor={switchId}
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

Switch.displayName = 'Switch'; 
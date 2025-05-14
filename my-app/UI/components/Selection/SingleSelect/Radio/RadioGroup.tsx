import React from 'react';
import { cn } from '~/utils/cn';
import { Radio } from '~/components/Selection/SingleSelect/Radio/Radio';

export interface RadioOption {
  label: string;
  value: string;
  helperText?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  required?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      error,
      helperText,
      disabled = false,
      size = 'md',
      name,
      required,
      orientation = 'vertical',
      className,
    },
    ref
  ) => {
    const groupId = React.useId();

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={groupId}
            className={cn(
              'select-none font-medium text-gray-700',
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        <div
          ref={ref}
          role="radiogroup"
          aria-labelledby={label ? groupId : undefined}
          aria-required={required}
          className={cn(
            'flex gap-4',
            orientation === 'vertical' ? 'flex-col' : 'flex-row',
            className
          )}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              label={option.label}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              disabled={disabled}
              size={size}
              name={name}
              helperText={option.helperText}
            />
          ))}
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

RadioGroup.displayName = 'RadioGroup'; 
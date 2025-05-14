import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface DialogProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showClose?: boolean;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      className,
      open = false,
      onClose,
      title,
      description,
      children,
      size = 'md',
      showClose = true,
      ...props
    },
    ref
  ) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'relative w-full rounded-lg bg-white p-6 shadow-lg',
                sizeStyles[size],
                className
              )}
              {...props}
            >
              {showClose && (
                <button
                  type="button"
                  className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {description && (
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              )}
              <div className="mt-4">{children}</div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

Dialog.displayName = 'Dialog'; 
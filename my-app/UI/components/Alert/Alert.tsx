import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export interface AlertProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  title?: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  closable?: boolean;
  icon?: React.ReactNode;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 text-blue-800',
    icon: 'text-blue-400',
    close: 'text-blue-500 hover:bg-blue-100',
  },
  success: {
    container: 'bg-green-50 text-green-800',
    icon: 'text-green-400',
    close: 'text-green-500 hover:bg-green-100',
  },
  warning: {
    container: 'bg-yellow-50 text-yellow-800',
    icon: 'text-yellow-400',
    close: 'text-yellow-500 hover:bg-yellow-100',
  },
  error: {
    container: 'bg-red-50 text-red-800',
    icon: 'text-red-400',
    close: 'text-red-500 hover:bg-red-100',
  },
};

const defaultIcons = {
  info: <InformationCircleIcon className="h-5 w-5" />,
  success: <CheckCircleIcon className="h-5 w-5" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5" />,
  error: <ExclamationCircleIcon className="h-5 w-5" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      title,
      description,
      variant = 'info',
      onClose,
      closable = false,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-lg p-4',
          variantStyles[variant].container,
          className
        )}
        role="alert"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        {...props}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            {icon || defaultIcons[variant]}
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <h3 className="text-sm font-medium">{title}</h3>
            )}
            {description && (
              <div className="mt-2 text-sm">{description}</div>
            )}
          </div>
          {closable && (
            <div className="ml-auto pl-3">
              <button
                type="button"
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  variantStyles[variant].close
                )}
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert'; 
import { cn } from '@/utils/cn';
import
  {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { Card } from '../Card/Card';
import { Typography } from '../Typography/Typography';

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
  info: <InformationCircleIcon className='h-6 w-6' />,
  success: <CheckCircleIcon className='h-6 w-6' />,
  warning: <ExclamationTriangleIcon className='h-6 w-6' />,
  error: <ExclamationCircleIcon className='h-6 w-6' />,
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
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        role='alert'
        {...props}
      >
        <Card
          size='sm'
          className={ cn( variantStyles[ variant ].container,
            'flex  gap-4',
          title && 'items-center',
          description && 'items-start',) }>
          <div className='flex-shrink-0'>{icon || defaultIcons[variant]}</div>
          <div className='flex-1 items-start justify-start'>
            {title && (
              <Typography
                variant='h6'
                weight='semibold'
                className={cn(variantStyles[variant].container)}
                color='default'
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant='p'
                
                color='default'
              >
                {description}
              </Typography>
            )}
          </div>
          {closable && (
            <div className='ml-auto pl-3'>
              <button
                type='button'
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  variantStyles[variant].close,
                )}
                onClick={onClose}
              >
                <XMarkIcon className='h-5 w-5' />
              </button>
            </div>
          )}
        </Card>
      </motion.div>
    );
  },
);

Alert.displayName = 'Alert';

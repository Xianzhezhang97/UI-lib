import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-white shadow-lg',
  secondary: 'bg-white border border-gray-200',
  tertiary: 'bg-gray-100',
};

const sizeStyles = {
  sm: 'p-[20px] rounded-[14px]',
  md: 'p-[20px] md:p-[28px] rounded-[14px] md:rounded-[28px]',
  lg: 'p-[20px] md:p-[28px] lg:p-[30px] rounded-[14px] md:rounded-[28px] lg:rounded-[42px]',
  xl: 'p-[20px] md:p-[28px] lg:p-[30px] xl:p-[40px] rounded-[14px] md:rounded-[28px] lg:rounded-[42px] xl:rounded-[56px]',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = 'primary', size = 'md', children, ...props },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = 'Card';

// Card Subcomponents
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex md:flex-reverse md:flex-row  flex-col items-center pt-4 w-full gap-4',
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

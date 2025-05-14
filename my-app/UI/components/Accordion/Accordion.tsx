import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface AccordionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      title,
      children,
      defaultOpen = false,
      disabled = false,
      icon,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-gray-200',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <button
          className={cn(
            'flex w-full items-center justify-between px-4 py-3 text-left',
            disabled && 'cursor-not-allowed'
          )}
          onClick={toggleOpen}
          disabled={disabled}
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon || <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
          </motion.div>
        </button>
        <motion.div
          ref={contentRef}
          initial={false}
          animate={{
            height: isOpen ? contentRef.current?.scrollHeight : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-3 text-sm text-gray-500">{children}</div>
        </motion.div>
      </motion.div>
    );
  }
);

Accordion.displayName = 'Accordion'; 
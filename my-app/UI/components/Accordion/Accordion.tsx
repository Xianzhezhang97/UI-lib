import { cn } from '@/utils/cn';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

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
          'w-full rounded-lg border border-gray-200 cursor-pointer group ',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        { ...props }
         onClick={toggleOpen}
          
      >
        <div
          className={cn(
            'flex w-full items-center justify-between px-4 py-3 text-left group'
          ) }
          
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <motion.div
            animate={{ rotate: isOpen ? '180deg' : '0deg' }}
            transition={ { duration: 0.7, ease: [ 0.22, 1, 0.36, 1 ] } }
            className='group-hover:bg-gray-100 rounded-full p-2 transform -translate-x-1/2 '
          >
            {icon || <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
          </motion.div>
        </div>
        <motion.div
          ref={contentRef}
          initial={false}
          animate={{
            height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
            opacity: isOpen ? 1 : 0,
          }}
          transition={ { duration: 0.7, ease: [ 0.22, 1, 0.36, 1 ] } }
          className="overflow-hidden flex flex-col"
        >
          <div className="px-4 pb-3 text-sm text-gray-500">{children}</div>
        </motion.div>
      </motion.div>
    );
  }
);

Accordion.displayName = 'Accordion'; 
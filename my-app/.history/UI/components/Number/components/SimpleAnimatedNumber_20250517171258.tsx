import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Digit from './Digit';
import { formatNumberValue } from '../utils/numberFormatters';
import { AnimatedNumberProps } from '../types';

/**
 * Simple AnimatedNumber Component
 * Displays a number with animations and formatting options
 */
export const SimpleAnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  useShortFormat = false,
  maxSignificantDigits = 3,
  size = 'md',
  fontWeight = 'semibold',
  textColor = 'text-gray-700',
  animate = true,
  className,
  style,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  
  // Size class mapping
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  // Weight class mapping
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  useEffect(() => {
    // Format number based on configuration
    // useShortFormat and maxSignificantDigits are mutually exclusive
    const formatted = formatNumberValue(value, useShortFormat, maxSignificantDigits);
    setDisplayValue(formatted);
  }, [value, useShortFormat, maxSignificantDigits]);

  // Split the formatted value into individual characters for animation
  const digits = displayValue.split('');

  // Animation variants
  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        'flex items-center tabular-nums',
        sizeClasses[size],
        weightClasses[fontWeight],
        textColor,
        className
      )}
      style={style}
    >
      {digits.map((char, index) => (
        <motion.div
          key={`${index}-${char}`}
          variants={animate ? variants : undefined}
          initial={animate ? "initial" : undefined}
          animate={animate ? "animate" : undefined}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Digit
            value={char}
            prevValue=""
            animation={animate ? "fade" : "none"}
            duration={0.3}
            delay={0}
            isSpecialChar={char === '.' || char === ',' || char === ' '}
          />
        </motion.div>
      ))}
    </div>
  );
};

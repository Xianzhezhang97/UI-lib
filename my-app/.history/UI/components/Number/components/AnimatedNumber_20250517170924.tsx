import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Digit from './Digit';
import { formatNumber } from '../utils/formatters';
import { variants } from '../utils/animationVariants';
import { AnimatedNumberProps } from '../types';

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  useShortFormat = false,
  maxSignificantDigits = 3,
  size = 'md',
  fontWeight = 'semibold',
  textColor = 'text-gray-700',
  animate = true,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    const formatted = formatNumber(value, useShortFormat, maxSignificantDigits);
    setDisplayValue(formatted);
  }, [value, useShortFormat, maxSignificantDigits]);

  // Split the formatted value into individual characters for animation
  const digits = displayValue.split('');

  return (
    <div className={`flex items-center ${textColor}`}>
      {digits.map((char, index) => (
        <motion.div
          key={`${index}-${char}`}
          variants={animate ? variants : undefined}
          initial={animate ? 'initial' : undefined}
          animate={animate ? 'animate' : undefined}
          className={`font-${fontWeight}`}
        >
          <Digit char={char} size={size} />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedNumber;

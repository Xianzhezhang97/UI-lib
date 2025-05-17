import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationType } from '../types';
import { getVariants } from '../utils/animationVariants';

interface DigitProps {
  value: string;
  prevValue: string;
  animation: AnimationType;
  duration: number;
  delay: number;
  fontSize?: string;
  isSpecialChar?: boolean;
  isSymbol?: boolean;
}

/**
 * Single animated digit component that handles the transition between values
 */
export const Digit: React.FC<DigitProps> = ({ 
  value, 
  prevValue, 
  animation, 
  duration, 
  delay,
  fontSize,
  isSpecialChar,
  isSymbol 
}) => {
  const variants = getVariants(animation);
  const hasChanged = value !== prevValue;
  const direction = hasChanged 
    ? (isNaN(Number(value)) || isNaN(Number(prevValue)) 
        ? 'up' // 非数字字符使用默认方向
        : Number(value) > Number(prevValue) ? 'up' : 'down')
    : 'up';

  const style = fontSize ? { fontSize } : {};
  
  // 为特殊字符使用更紧凑的宽度（如小数点、逗号）
  let widthClass = isSpecialChar ? 'w-[0.2em]' : 'w-[0.6em]';
  // 为后缀字符 (K/M/B/%) 提供足够宽度
  if (value === 'K' || value === 'M' || value === 'B' || value === '%') {
    widthClass = 'w-[0.8em]';
  }
  // 为货币符号提供额外的右边距
  const marginClass = isSymbol ? 'mr-1' : '';

  if (animation === 'none') {
    return (
      <div 
        className={`relative inline-block ${widthClass} ${marginClass} h-[1em] flex items-center justify-center font-medium`}
        style={style}
      >
        {value}
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-block overflow-hidden ${widthClass} ${marginClass} h-[1em]`}
      style={style}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 500, damping: 30 },
            opacity: { duration: duration * 0.5 },
            rotateX: { type: "spring", stiffness: 500, damping: 30 },
            delay,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { motion, Variants } from 'framer-motion';

const defaultVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  
};

const defaultTransition = {
  duration: 0.3,
  ease: 'easeOut',
};

interface AnimationDecoratorProps {
  variants?: Variants;
  transition?: typeof defaultTransition;
  children: React.ReactNode;
}

export const AnimationDecorator: React.FC<AnimationDecoratorProps> = ({
  variants = defaultVariants,
  transition = defaultTransition,
  children,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export const withAnimation = (Story: React.ComponentType) => {
  return (
    <AnimationDecorator>
      <Story />
    </AnimationDecorator>
  );
};

// 预定义的动画变体
export const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
}; 
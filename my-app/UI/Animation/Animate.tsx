import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/utils/cn';

export type AnimationType = 
  | 'fade' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right' 
  | 'zoom' 
  | 'bounce'
  | 'flip'
  | 'rotate'
  | 'scale'
  | 'shake'
  | 'pulse'
  | 'wiggle'
  | 'none';

export type AnimationTiming = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

interface AnimateProps {
  children: React.ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: AnimationTiming;
  repeat?: number | 'infinity';
  className?: string;
  whileHover?: AnimationType;
  whileTap?: AnimationType;
  whileInView?: AnimationType;
  once?: boolean;
}

const baseVariants: Record<AnimationType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  'slide-down': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  'slide-left': {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  'slide-right': {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  zoom: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: { opacity: 0, y: 20 }
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 }
  },
  scale: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
  },
  shake: {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  },
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    }
  },
  wiggle: {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5
      }
    }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
};

export const Animate: React.FC<AnimateProps> = ({
  children,
  type = 'fade',
  duration = 0.5,
  delay = 0,
  ease = 'easeInOut',
  repeat = 0,
  className,
  whileHover,
  whileTap,
  whileInView,
  once = false,
}) => {
  const baseTransition = {
    duration,
    delay,
    ease: ease,
    repeat,
  };

  const variants = baseVariants[type];
  const hoverVariants = whileHover ? baseVariants[whileHover] : undefined;
  const tapVariants = whileTap ? baseVariants[whileTap] : undefined;
  const inViewVariants = whileInView ? baseVariants[whileInView] : undefined;

  return (
    <motion.div
      className={cn('', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={whileHover ? "animate" : undefined}
      whileTap={whileTap ? "animate" : undefined}
      whileInView={whileInView ? "animate" : undefined}
      viewport={{ once }}
      variants={{
        ...variants,
        ...(hoverVariants && { hover: hoverVariants.animate }),
        ...(tapVariants && { tap: tapVariants.animate }),
        ...(inViewVariants && { inView: inViewVariants.animate }),
      }}
      transition={baseTransition}
    >
      {children}
    </motion.div>
  );
}; 
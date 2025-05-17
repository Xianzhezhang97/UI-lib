import { Variants } from 'framer-motion';
import { AnimationType } from '../types';

/**
 * Generates animation variants based on the specified animation type
 */
export const getVariants = (animation: AnimationType): Variants => {
  switch (animation) {
    case 'slide':
      return {
        enter: (direction: 'up' | 'down') => ({
          y: direction === 'up' ? '100%' : '-100%',
          opacity: 0,
        }),
        center: {
          y: 0,
          opacity: 1,
        },
        exit: (direction: 'up' | 'down') => ({
          y: direction === 'up' ? '-100%' : '100%',
          opacity: 0,
          position: 'absolute',
        }),
      };
    case 'flip':
      return {
        enter: (direction: 'up' | 'down') => ({
          rotateX: direction === 'up' ? 90 : -90,
          opacity: 0,
        }),
        center: {
          rotateX: 0,
          opacity: 1,
        },
        exit: (direction: 'up' | 'down') => ({
          rotateX: direction === 'up' ? -90 : 90,
          opacity: 0,
          position: 'absolute',
        }),
      };
    case 'fade':
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0, position: 'absolute' },
      };
    case 'none':
    default:
      return {
        enter: { opacity: 1 },
        center: { opacity: 1 },
        exit: { opacity: 1, position: 'absolute' },
      };
  }
};

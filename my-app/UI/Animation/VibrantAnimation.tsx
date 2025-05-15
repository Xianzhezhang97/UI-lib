import { motion, Variants } from 'framer-motion';
import React from 'react';

interface VibrantAnimationProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

// 外层容器的动画配置
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// 每个子元素的动画
const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.9,
      },
      y: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.7,
      },
    },
  },
};

export const VibrantAnimation: React.FC<VibrantAnimationProps> = ({
  children,
  className,
  once = true,
}) => {
  return (
    <motion.ul
      className={className}
      variants={containerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{
        margin: '25% 0px -25% 0px',
        once,
        amount: 0.25,
      }}
    >
      {/* 自动给每个子项加上动画 */}
      {React.Children.map(children, (child, index) => (
        <motion.li
          variants={childVariants}
          key={index}
          className={child.props.className} // ✅ 把 child 的 className 放到 motion.div 上
        >
          {React.cloneElement(child, { className })}
        </motion.li>
      ))}
    </motion.ul>
  );
};

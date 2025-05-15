import React from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'label' | 'small' | 'blockquote'
  | 'code' | 'pre' | 'kbd' | 'mark' | 'del' | 'ins'
  | 'sub' | 'sup' | 'strong' | 'em' | 'u' | 'i' | 'b';

export type TypographyWeight = 
  | 'thin' | 'extralight' | 'light' | 'normal' 
  | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyColor = 
  | 'default' | 'primary' | 'secondary' | 'muted' 
  | 'accent' | 'success' | 'warning' | 'error' | 'info';

export type TypographyAnimation = 
  | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' 
  | 'slide-right' | 'zoom' | 'bounce' | 'none';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  content?: string;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: TypographyColor;
  animation?: TypographyAnimation;
  truncated?: number;
  gradient?: boolean;
  underline?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  className?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl md:text-5xl lg:text-6xl',
  h2: 'text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-xl md:text-2xl lg:text-3xl',
  h5: 'text-lg md:text-xl lg:text-2xl',
  h6: 'text-base md:text-lg lg:text-xl',
  p: 'text-base',
  span: 'text-base',
  label: 'text-sm font-medium',
  small: 'text-sm',
  blockquote: 'text-lg italic border-l-4 pl-4',
  code: 'text-sm font-mono bg-gray-100 px-1 rounded',
  pre: 'text-sm font-mono bg-gray-100 p-4 rounded overflow-x-auto',
  kbd: 'text-sm font-mono bg-gray-100 px-2 py-1 rounded border',
  mark: 'bg-yellow-100 px-1',
  del: 'line-through',
  ins: 'underline',
  sub: 'text-sm align-sub',
  sup: 'text-sm align-super',
  strong: 'font-bold',
  em: 'italic',
  u: 'underline',
  i: 'italic',
  b: 'font-bold',
};

const weightStyles: Record<TypographyWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

const alignStyles: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const colorStyles: Record<TypographyColor, string> = {
  default: 'text-gray-900 dark:text-gray-100',
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  muted: 'text-gray-500 dark:text-gray-500',
  accent: 'text-purple-600 dark:text-purple-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
};



export const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  content,
  weight = 'normal',
  align = 'left',
  color = 'default',
  animation = 'none',
  truncated,
  gradient = false,
  underline = false,
  italic = false,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  className,
  children,
  ...props
}) => {
  const Component = variant as keyof JSX.IntrinsicElements;
  const text = content || children;

  const baseStyles = cn(
    variantStyles[variant],
    weightStyles[weight],
    alignStyles[align],
    colorStyles[color],
    {
      'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent': gradient,
      'underline': underline,
      'italic': italic,
      'uppercase': uppercase,
      'lowercase': lowercase,
      'capitalize': capitalize,
      'line-clamp-1': truncated === 1,
      'line-clamp-2': truncated === 2,
      'line-clamp-3': truncated === 3,
      'line-clamp-4': truncated === 4,
      'line-clamp-5': truncated === 5,
      'line-clamp-6': truncated === 6,
    },
    className
  );


  if (animation === 'none') {
    return (
      <Component className={baseStyles} {...props}>
        {text}
      </Component>
    );
  }

  return (
      <Component className={baseStyles} {...props}>
        {text}
      </Component>

  );
}; 
import { Alert } from '@/UI/Components/Alert/Alert';
import { ImagePro } from '@/UI/Components/Image/ImagePro';
import { cn } from '@/UI/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'>
{
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  imageRatio?: '1/1' | '4/3' | '16/9';
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  imgClassName?: string;
}

const variantStyles = {
  primary: 'bg-white border border-gray-200',
  secondary: 'bg-white border border-gray-200',
  tertiary: 'bg-gray-100',
};

const roundedStyles = {
  sm: 'rounded-[14px]',
  md: 'rounded-[14px] md:rounded-[28px]',
  lg: 'rounded-[14px] md:rounded-[28px] lg:rounded-[42px]',
  xl: 'rounded-[14px] md:rounded-[28px] lg:rounded-[42px] xl:rounded-[56px]',
};

const paddingStyles = {
  sm: 'p-[14px]',
  md: 'p-[14px] md:p-[28px]',
  lg: 'p-[14px] md:p-[28px] lg:p-[42px]',
  xl: 'p-[14px] md:p-[28px] lg:p-[42px] xl:p-[56px]',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      imagePosition = 'top',
      imageRatio = '1/1',
      imgClassName,
      src,
      alt,
      width = '200px',
      height = '200px',
      minWidth = '200px',
      minHeight = '200px',
      maxWidth = '200px',
      maxHeight = '200px',
      ...props
    },
    ref,
  ) =>
  {
    return (
      <motion.div
        ref={ ref }
        className={ cn(
          variantStyles[ variant ],
          roundedStyles[ size ],
          'overflow-hidden flex relative w-full',
          width && `max-w-[${ width }]`,
          height && `max-h-[${ height }]`,
          minWidth && `min-w-[${ minWidth }]`,
          minHeight && `min-h-[${ minHeight }]`,
          maxWidth && `max-w-[${ maxWidth }]`,
          maxHeight && `max-h-[${ maxHeight }]`,
          imagePosition === 'top' && 'flex-col',
          imagePosition === 'bottom' && 'flex-col-reverse',
          imagePosition === 'left' && 'flex-row',
          imagePosition === 'right' && 'flex-row-reverse',
          className
        ) }
        { ...props }
      >
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        { src && (
          <>
            <ImagePro
              src={ src }
              alt={ alt || 'image' }
              className={ cn( 'w-full h-full flex', imgClassName, imageRatio === '1/1' && 'aspect-square', imageRatio === '4/3' && 'aspect-[4/3]', imageRatio === '16/9' && 'aspect-[16/9]' ) }
              withSkeleton
              objectFit="contain"
              rounded="lg"
            />
            { !alt && (
              <Alert
                variant="warning"
                description="You need to provide alt text for the image"
                className="absolute top-4 right-4"
              />
            ) }
          </>
        ) }
        <div className={ cn( paddingStyles[ size ], 'w-full flex flex-col' ) }>
          { children }
        </div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

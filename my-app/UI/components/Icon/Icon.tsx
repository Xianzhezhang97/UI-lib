import { cn } from '@/utils/cn';
import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconVariant = 'regular' | 'bold' | 'fill';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: IconSize;
  variant?: IconVariant;
}

const sizeStyles: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 'md', variant = 'regular', ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(
          'inline-block',
          sizeStyles[size],
          'stroke-current',
          variant === 'fill' && 'fill-current',
          className,
        )}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        strokeWidth={variant === 'bold' ? 2 : 1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';

// 常用图标
export const Icons = {
  // 导航图标
  home: (props: IconProps) => (
    <Icon {...props}>
      <path d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
    </Icon>
  ),
  search: (props: IconProps) => (
    <Icon {...props}>
      <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
    </Icon>
  ),
  menu: (props: IconProps) => (
    <Icon {...props}>
      <path d='M4 6h16M4 12h16M4 18h16' />
    </Icon>
  ),

  // 操作图标
  plus: (props: IconProps) => (
    <Icon {...props}>
      <path d='M12 4v16m8-8H4' />
    </Icon>
  ),
  close: (props: IconProps) => (
    <Icon {...props}>
      <path d='M6 18L18 6M6 6l12 12' />
    </Icon>
  ),
  check: (props: IconProps) => (
    <Icon {...props}>
      <path d='M5 13l4 4L19 7' />
    </Icon>
  ),

  // 社交图标
  heart: (props: IconProps) => (
    <Icon {...props}>
      <path d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
    </Icon>
  ),
  share: (props: IconProps) => (
    <Icon {...props}>
      <path d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
    </Icon>
  ),
  comment: (props: IconProps) => (
    <Icon {...props}>
      <path d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
    </Icon>
  ),

  // 媒体图标
  image: (props: IconProps) => (
    <Icon {...props}>
      <path d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
    </Icon>
  ),
  video: (props: IconProps) => (
    <Icon {...props}>
      <path d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
    </Icon>
  ),
  music: (props: IconProps) => (
    <Icon {...props}>
      <path d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' />
    </Icon>
  ),
};

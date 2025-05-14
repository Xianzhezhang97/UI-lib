import React from 'react';
import { cn } from '@/utils/cn';

export type IconStyle = 'regular-rounded' | 'regular-straight' | 'solid-rounded' | 'solid-straight' | 'bold-rounded' | 'bold-straight' | 'thin-rounded' | 'thin-straight';

export type IconName = 
  | 'home'
  | 'user'
  | 'settings'
  | 'notification'
  | 'search'
  | 'menu'
  | 'close'
  | 'edit'
  | 'delete'
  | 'add'
  | 'check'
  | 'cancel'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'star'
  | 'heart'
  | 'share'
  | 'download'
  | 'upload'
  | 'link'
  | 'calendar'
  | 'clock'
  | 'location'
  | 'phone'
  | 'email'
  | 'message'
  | 'camera'
  | 'image'
  | 'video'
  | 'music'
  | 'file'
  | 'folder'
  | 'trash';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  style?: IconStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-2xl',
  '2xl': 'text-4xl',
};

// 图标风格前缀映射
const stylePrefixMap: Record<IconStyle, string> = {
  'regular-rounded': 'fi-rr',
  'regular-straight': 'fi-rs',
  'solid-rounded': 'fi-sr',
  'solid-straight': 'fi-ss',
  'bold-rounded': 'fi-br',
  'bold-straight': 'fi-bs',
  'thin-rounded': 'fi-tr',
  'thin-straight': 'fi-ts',
};

// 图标名称映射到 Flaticon 类名
const iconNameMap: Record<IconName, string> = {
  home: 'home',
  user: 'user',
  settings: 'settings',
  notification: 'bell',
  search: 'search',
  menu: 'menu-burger',
  close: 'cross',
  edit: 'edit',
  delete: 'trash',
  add: 'add',
  check: 'check',
  cancel: 'cross-circle',
  'arrow-left': 'arrow-left',
  'arrow-right': 'arrow-right',
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  star: 'star',
  heart: 'heart',
  share: 'share',
  download: 'download',
  upload: 'upload',
  link: 'link',
  calendar: 'calendar',
  clock: 'clock',
  location: 'marker',
  phone: 'phone-call',
  email: 'envelope',
  message: 'comment',
  camera: 'camera',
  image: 'picture',
  video: 'video-camera',
  music: 'music',
  file: 'file',
  folder: 'folder',
  trash: 'trash',
};

export const Icon: React.FC<IconProps> = ({
  name,
  style = 'regular-rounded',
  size = 'md',
  color,
  className,
  ...props
}) => {
  return (
    
    <i
      className={cn(
        `${stylePrefixMap[style]}-${iconNameMap[name]}`,
        sizeStyles[size],
        color,
        className
      )}
      {...props}
    />
  );
}; 
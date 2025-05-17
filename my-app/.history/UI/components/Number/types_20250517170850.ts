import React from 'react';

export type NumberFormat =
  | 'standard'
  | 'currency'
  | 'percentage'
  | 'decimal';

export type NumberType = 
  | 'standard'    // 标准数字格式
  | 'scientific'  // 科学计数法
  | 'engineering';// 工程计数法

export type AnimationType = 'flip' | 'slide' | 'fade' | 'none';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface AnimatedNumberProps {
  /**
   * The number value to display
   */
  value: number | string;
  /**
   * The initial value before the animation starts
   */
  startValue?: number;
  /**
   * The format of the number
   */
  format?: NumberFormat;
  /**
   * The type of animation to use
   */
  animation?: AnimationType;
  /**
   * The duration of the animation in milliseconds
   */
  duration?: number;
  /**
   * Custom CSS class for the component
   */
  className?: string;
  /**
   * Custom inline styles for the component
   */
  style?: React.CSSProperties;
  /**
   * Number of decimal places to show
   */
  decimalPlaces?: number;
  /**
   * Prefix to add before the number
   */
  prefix?: string;
  /**
   * Suffix to add after the number
   */
  suffix?: string;
  /**
   * Locale for number formatting
   */
  locale?: string;
  /**
   * Delay between character animations in milliseconds
   */
  delayPerChar?: number;
  /**
   * Currency type for currency formatting
   */
  currencyType?: string;
  /**
   * Whether to use short format (K, M, B) for large numbers
   * When true, maxSignificantDigits setting is ignored
   */
  useShortFormat?: number | boolean;
  /**
   * Maximum number of significant digits to show
   * Only used when useShortFormat is false
   * Default: 3
   */
  maxSignificantDigits?: number;
  /**
   * Size of the number
   * Default: 'md'
   */
  size?: FontSize;
  /**
   * Font weight of the number
   * Default: 'semibold'
   */
  fontWeight?: FontWeight;
  /**
   * Text color CSS class
   * Default: 'text-gray-700'
   */
  textColor?: string;
  /**
   * Whether to animate the number change
   * Default: true
   */
  animate?: boolean;
}

export interface FormattedNumberParts {
  currencySymbol: string;
  integerPart: string;
  decimalPart: string;
  suffix: string;
  fullText: string;
}

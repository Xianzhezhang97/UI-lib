import React from 'react';

export type NumberFormat = 'standard' | 'currency' | 'percentage' | 'decimal';

export type NumberType =
  | 'standard' // 标准数字格式
  | 'scientific' // 科学计数法
  | 'engineering'; // 工程计数法

export type AnimationType = 'flip' | 'slide' | 'fade' | 'none';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface AnimatedNumberProps {
  /**
   * The number value to display
   */
  value: number;
  
  /**
   * Whether to use short format (K, M, B) for large numbers
   * When true, maxSignificantDigits setting is ignored
   */
  useShortFormat?: boolean;
  
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

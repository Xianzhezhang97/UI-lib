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

export interface AnimatedNumberProps {
  value: number | string;
  startValue?: number;
  format?: NumberFormat;
  animation?: AnimationType;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  delayPerChar?: number;
  currencyType?: string;
  useShortFormat?: boolean;
  numberType?: NumberType;
  currencySymbolSize?: string;
  integerPartSize?: string;
  decimalPartSize?: string;
  suffixSize?: string;
}

export interface FormattedNumberParts {
  currencySymbol: string;
  integerPart: string;
  decimalPart: string;
  suffix: string;
  fullText: string;
}

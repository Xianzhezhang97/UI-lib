import { NumberFormat, NumberType } from '../types';

/**
 * Extracts and separates the currency symbol, integer part, decimal part, and suffix from a formatted number
 */
export const parseFormattedNumber = (
  formattedValue: string,
  format: NumberFormat,
  locale: string,
  currencyType: string,
  useShortFormat: boolean
): { currencySymbol: string, integerPart: string, decimalPart: string, suffix: string } => {
  // 默认值
  let result = {
    currencySymbol: '',
    integerPart: formattedValue,
    decimalPart: '',
    suffix: ''
  };

  // 处理后缀 (K, M, B)
  const extractSuffix = (value: string): { mainPart: string, suffix: string } => {
    const shortSuffixes = ['K', 'M', 'B'];
    let mainPart = value;
    let suffix = '';
    
    for (const sfx of shortSuffixes) {
      if (value.endsWith(sfx)) {
        mainPart = value.slice(0, -1);
        suffix = sfx;
        break;
      }
    }
    
    return { mainPart, suffix };
  };

  // 处理货币格式
  if (format === 'currency') {
    // 获取货币符号
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyType
    });
    const parts = formatter.formatToParts(0);
    const currencySymbol = parts.find(part => part.type === 'currency')?.value || '';
    
    // 检查是否有短格式后缀
    const { mainPart, suffix } = extractSuffix(formattedValue);
    result.suffix = suffix;
    
    // 分离货币符号
    const symbolIndex = mainPart.indexOf(currencySymbol);
    if (symbolIndex !== -1) {
      result.currencySymbol = currencySymbol;
      
      // 根据符号位置决定如何分割
      let valueWithoutSymbol: string;
      if (symbolIndex === 0) {
        // 符号在前
        valueWithoutSymbol = mainPart.substring(currencySymbol.length).trim();
        // 检查是否有符号后的空格
        if (mainPart[currencySymbol.length] === ' ') {
          result.currencySymbol += ' ';
        }
      } else {
        // 符号在后
        valueWithoutSymbol = mainPart.substring(0, symbolIndex).trim();
      }
      
      // 分离整数和小数部分
      const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
      const separatorIndex = valueWithoutSymbol.indexOf(decimalSeparator);
      
      if (separatorIndex !== -1) {
        result.integerPart = valueWithoutSymbol.substring(0, separatorIndex);
        result.decimalPart = decimalSeparator + valueWithoutSymbol.substring(separatorIndex + 1);
      } else {
        result.integerPart = valueWithoutSymbol;
      }
    } else {
      // 处理无法找到符号的情况
      result.integerPart = mainPart;
    }
  } else if (format === 'percentage') {
    // 处理百分比格式
    const formatter = new Intl.NumberFormat(locale, { style: 'percent' });
    const parts = formatter.formatToParts(0);
    const percentSign = parts.find(part => part.type === 'percentSign')?.value || '%';
    
    // 移除百分比符号
    const percentIndex = formattedValue.indexOf(percentSign);
    if (percentIndex !== -1) {
      result.suffix = percentSign;
      const valueWithoutPercent = formattedValue.substring(0, percentIndex).trim();
      
      // 分离整数和小数部分
      const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
      const separatorIndex = valueWithoutPercent.indexOf(decimalSeparator);
      
      if (separatorIndex !== -1) {
        result.integerPart = valueWithoutPercent.substring(0, separatorIndex);
        result.decimalPart = decimalSeparator + valueWithoutPercent.substring(separatorIndex + 1);
      } else {
        result.integerPart = valueWithoutPercent;
      }
    } else {
      result.integerPart = formattedValue;
    }
  } else {
    // 处理其他格式
    const { mainPart, suffix } = extractSuffix(formattedValue);
    result.suffix = suffix;
    
    // 处理小数分离
    const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);
    const separatorIndex = mainPart.indexOf(decimalSeparator);
    
    if (separatorIndex !== -1) {
      result.integerPart = mainPart.substring(0, separatorIndex);
      result.decimalPart = decimalSeparator + mainPart.substring(separatorIndex + 1);
    } else {
      result.integerPart = mainPart;
    }
  }

  return result;
};

/**
 * Format a number to a specified precision of significant digits
 * @param value The number to format
 * @param precision The maximum number of significant digits to show
 * @returns The formatted number as a string
 */
export const formatToSignificantDigits = (value: number, precision: number): string => {
  // Convert to precision significant digits
  const formatted = value.toPrecision(precision);
  
  // Remove trailing zeros and decimal point if needed
  return formatted.replace(/\.?0+$/, '');
};

/**
 * Format a number using shorthand notation (K, M, B, etc.)
 * @param value The number to format
 * @returns The formatted number as a string with appropriate suffix
 */
export const formatShort = (value: number): string => {
  const abs = Math.abs(value);
  
  if (abs >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  
  return value.toString();
};

/**
 * Format a number based on configuration options
 * @param value The number to format
 * @param useShortFormat Whether to use shorthand notation (K, M, B)
 * @param maxSignificantDigits Maximum number of significant digits to show (only used if useShortFormat is false)
 * @returns The formatted number as a string
 */
export const formatNumber = (
  value: number, 
  useShortFormat: boolean, 
  maxSignificantDigits: number = 3
): string => {
  if (useShortFormat) {
    return formatShort(value);
  }
  
  return formatToSignificantDigits(value, maxSignificantDigits);
};

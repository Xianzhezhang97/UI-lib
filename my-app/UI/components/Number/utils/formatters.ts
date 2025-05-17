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
 * 格式化数字为不同的显示格式
 */
export const formatNumber = (
  value: number | string,
  format: NumberFormat = 'standard',
  decimalPlaces: number = 0,
  locale: string = 'en-US',
  currencyType: string = 'USD',
  useShortFormat: boolean = false,
  numberType: NumberType = 'standard'
): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // 处理可能的NaN
  if (isNaN(num)) return '0';
  
  // 处理短格式显示
  const applyShortFormat = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(decimalPlaces) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(decimalPlaces) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(decimalPlaces) + 'K';
    return num.toFixed(decimalPlaces);
  };
  
  // 处理货币的短格式
  const applyCurrencyShortFormat = (num: number): string => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyType,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
    
    const parts = formatter.formatToParts(0);
    const symbol = parts.find(part => part.type === 'currency')?.value || '';
    
    // 获取数字并应用短格式
    let shortNumStr;
    if (num >= 1e9) shortNumStr = `${(num / 1e9).toFixed(decimalPlaces)}B`;
    else if (num >= 1e6) shortNumStr = `${(num / 1e6).toFixed(decimalPlaces)}M`;
    else if (num >= 1e3) shortNumStr = `${(num / 1e3).toFixed(decimalPlaces)}K`;
    else shortNumStr = num.toFixed(decimalPlaces);
    
    // 根据货币符号位置决定返回格式
    const currencyPosition = parts.findIndex(part => part.type === 'currency');
    const literalAfterCurrency = parts.find((part, index) => 
      index > currencyPosition && part.type === 'literal'
    )?.value || '';
    
    // 如果货币符号在前面
    if (currencyPosition === 0) {
      return `${symbol}${literalAfterCurrency}${shortNumStr}`;
    } else {
      // 货币符号在后面
      return `${shortNumStr}${symbol}`;
    }
  };

  // 处理数字类型格式
  const formatWithType = (num: number): string => {
    if (numberType === 'scientific') {
      return num.toExponential(decimalPlaces);
    } else if (numberType === 'engineering') {
      // 工程计数法 (指数为3的倍数)
      const exp = Math.floor(Math.log10(Math.abs(num)));
      const engExp = Math.floor(exp / 3) * 3;
      const mantissa = num / Math.pow(10, engExp);
      
      return mantissa.toFixed(decimalPlaces) + 'e' + engExp;
    } else {
      // 标准格式
      return useShortFormat
        ? applyShortFormat(num)
        : new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(num);
    }
  };
  
  // 处理特殊格式
  switch (format) {
    case 'currency':
      if (useShortFormat) {
        return applyCurrencyShortFormat(num);
      } else {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyType,
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(num);
      }
    case 'percentage':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimalPlaces,
      }).format(num);
    case 'decimal':
      return formatWithType(num);
    default: // standard
      return formatWithType(num);
  }
};

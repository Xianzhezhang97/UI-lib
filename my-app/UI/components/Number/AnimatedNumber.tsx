import { cn } from '@/utils/cn';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatedNumberProps, AnimationType, NumberFormat, NumberType } from './types';

// 将货币符号、整数部分、小数部分分离
const parseFormattedNumber = (
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

const formatNumber = (
  value: number | string,
  format: NumberFormat = 'standard',
  decimalPlaces: number = 0,
  locale: string = 'en-US',
  currencyType: string = 'USD',
  useShortFormat: boolean = false,
  numberType: NumberType = 'standard'
): string => {
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '';
  const num = Number(value);

  // 处理短格式显示
  const applyShortFormat = ( num: number ): string =>
  {
  
    if (num >= 1e9) return `${(num / 1e9).toFixed(decimalPlaces)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(decimalPlaces)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(decimalPlaces)}K`;
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
    if (useShortFormat) return applyShortFormat(num);

    switch(numberType) {
      case 'scientific':
        return num.toExponential(decimalPlaces);
      case 'engineering':
        return num.toExponential(decimalPlaces)
          .replace(/e([+-]?\d+)/, '×10<sup>$1</sup>');
      default:
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces
        }).format(num);
    }
  };

  // 处理特殊格式
  switch (format) {
    case 'currency':
      if (useShortFormat) {
        return applyCurrencyShortFormat(value);
      } else {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyType,
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(value);
      }
    case 'percentage':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(value);
    case 'decimal':
      return formatWithType(value);
    default: // standard
      return formatWithType(value);
  }
};

const getVariants = (animation: AnimationType): Variants => {
  switch (animation) {
    case 'flip':
      return {
        enter: (direction: 'up' | 'down') => ({
          rotateX: direction === 'up' ? 90 : -90,
          opacity: 0
        }),
        center: { 
          rotateX: 0, 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        },
        exit: (direction: 'up' | 'down') => ({
          rotateX: direction === 'up' ? -90 : 90,
          opacity: 0,
          transition: { duration: 0.3 }
        })
      };
    case 'slide':
      return {
        enter: (direction: 'up' | 'down') => ({
          y: direction === 'up' ? '100%' : '-100%',
          opacity: 0
        }),
        center: { 
          y: 0, 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        },
        exit: (direction: 'up' | 'down') => ({
          y: direction === 'up' ? '-100%' : '100%',
          opacity: 0,
          transition: { duration: 0.3 }
        })
      };
    case 'fade':
      return {
        enter: { opacity: 0 },
        center: { 
          opacity: 1,
          transition: { duration: 0.3 }
        },
        exit: { 
          opacity: 0,
          transition: { duration: 0.3 }
        }
      };
    default:
      return {};
  }
};

const Digit: React.FC<{
  value: string;
  prevValue: string;
  animation: AnimationType;
  duration: number;
  delay: number;
  fontSize?: string;
  isSpecialChar?: boolean;
  isSymbol?: boolean;
}> = ({ value, prevValue, animation, duration, delay, fontSize, isSpecialChar, isSymbol }) => {
  const variants = getVariants(animation);
  const hasChanged = value !== prevValue;
  const direction = hasChanged 
    ? (isNaN(Number(value)) || isNaN(Number(prevValue)) 
        ? 'up' // 非数字字符使用默认方向
        : Number(value) > Number(prevValue) ? 'up' : 'down')
    : 'up';

  const style = fontSize ? { fontSize } : {};
  
  // 为特殊字符使用更紧凑的宽度（如小数点、逗号）
  let widthClass = isSpecialChar ? 'w-[0.2em]' : 'w-[0.6em]';
  // 为后缀字符 (K/M/B/%) 提供足够宽度
  if (value === 'K' || value === 'M' || value === 'B' || value === '%') {
    widthClass = 'w-[0.8em]';
  }
  // 为货币符号提供额外的右边距
  const marginClass = isSymbol ? 'mr-1' : '';

  if (animation === 'none') {
    return (
      <div 
        className={`relative inline-block ${widthClass} ${marginClass} h-[1em] flex items-center justify-center font-medium`}
        style={style}
      >
        {value}
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-block overflow-hidden ${widthClass} ${marginClass} h-[1em]`}
      style={style}
    >
      <AnimatePresence mode="wait">
        {hasChanged ? (
          <>
            <motion.div
              key={`exit-${prevValue}`}
              variants={variants}
              custom={direction}
              initial="center"
              animate="exit"
              exit="exit"
              transition={{ 
                duration: duration / 2, 
                delay,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="absolute inset-0 flex items-center justify-center font-medium"
              dangerouslySetInnerHTML={{ __html: prevValue }}
            />
            <motion.div
              key={`enter-${value}`}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                duration: duration / 2, 
                delay,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="absolute inset-0 flex items-center justify-center font-medium"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </>
        ) : (
          <div 
            className="absolute inset-0 flex items-center justify-center font-medium"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  startValue = 0,
  format = 'standard',
  animation = 'slide',
  duration = 0.5,
  className,
  style,
  decimalPlaces = 0,
  prefix = '',
  suffix = '',
  locale = 'en-US',
  delayPerChar = 0.05,
  currencyType = 'USD',
  useShortFormat = false,
  numberType = 'standard',
  // 新增的尺寸控制属性
  currencySymbolSize,
  integerPartSize,
  decimalPartSize,
  suffixSize
}) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [formattedParts, setFormattedParts] = useState<{
    currencySymbol: string;
    integerPart: string;
    decimalPart: string;
    suffix: string;
    fullText: string;
  }>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    suffix: '',
    fullText: ''
  });
  const [prevFormattedParts, setPrevFormattedParts] = useState<{
    currencySymbol: string;
    integerPart: string;
    decimalPart: string;
    suffix: string;
    fullText: string;
  }>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    suffix: '',
    fullText: ''
  });
  const prevValueRef = useRef(startValue);

  useEffect(() => {
    const numValue = typeof value === 'number' ? value : parseFloat(value.toString());
    if (!isNaN(numValue)) {
      setPrevFormattedParts(formattedParts);
      const formatted = formatNumber(
        numValue, 
        format, 
        decimalPlaces, 
        locale,
        currencyType,
        useShortFormat,
        numberType
      );
      
      // 解析并分离格式化后的数字
      const parsedParts = parseFormattedNumber(formatted, format, locale, currencyType, useShortFormat);
      
      setFormattedParts({
        ...parsedParts,
        fullText: formatted
      });
      
      prevValueRef.current = currentValue;
      setCurrentValue(numValue);
    }
  }, [value, format, decimalPlaces, locale, currencyType, useShortFormat, numberType]);

  const calculateDelay = (index: number, totalLength: number, changed: boolean) => {
    if (!changed || animation === 'none') return 0;
    const reverseIndex = totalLength - 1 - index;
    return reverseIndex * delayPerChar;
  };

  const renderPart = (text: string, prevText: string, partFontSize?: string, isSymbol: boolean = false) => {
    const chars = text.split('');
    const prevChars = prevText ? prevText.split('') : Array(chars.length).fill(' ');
    
    return chars.map((char, index) => {
      const prevChar = prevChars[index] || ' ';
      const changed = prevChar !== char && prevChar !== ' ';
      const delay = calculateDelay(index, chars.length, changed);
      // 检查是否为特殊字符（小数点、逗号等）
      const isSpecialChar = char === '.' || char === ',' || char === ' ' || char === "'" || char === ' ';
      
      return (
        <Digit
          key={`${index}-${char}`}
          value={char}
          prevValue={prevChar}
          animation={animation}
          duration={duration}
          delay={delay}
          fontSize={partFontSize}
          isSpecialChar={isSpecialChar}
          isSymbol={isSymbol && index === chars.length - 1} // 只对符号的最后一个字符应用margin
        />
      );
    });
  };

  return (
    <div
      className={cn(
        'inline-flex items-center text-base font-medium tabular-nums',
        className
      )}
      style={style}
    >
      {prefix && <span className="mr-1" dangerouslySetInnerHTML={{ __html: prefix }} />}
      
      <div className="flex overflow-hidden items-baseline">
        {/* 货币符号部分 */}
        {formattedParts.currencySymbol && (
          <div className="flex" style={currencySymbolSize ? { fontSize: currencySymbolSize } : {}}>
            {renderPart(
              formattedParts.currencySymbol, 
              prevFormattedParts.currencySymbol, 
              currencySymbolSize,
              true // 标记为符号，应用margin
            )}
          </div>
        )}
        
        {/* 整数部分 */}
        <div className="flex" style={integerPartSize ? { fontSize: integerPartSize } : {}}>
          {renderPart(
            formattedParts.integerPart, 
            prevFormattedParts.integerPart,
            integerPartSize
          )}
        </div>
        
        {/* 小数部分 */}
        {formattedParts.decimalPart && (
          <div className="flex" style={decimalPartSize ? { fontSize: decimalPartSize } : {}}>
            {renderPart(
              formattedParts.decimalPart, 
              prevFormattedParts.decimalPart,
              decimalPartSize
            )}
          </div>
        )}
        
        {/* 后缀 (K/M/B/%) */}
        {formattedParts.suffix && (
          <div className="flex" style={decimalPartSize ? { fontSize: decimalPartSize } : {}}>
            {renderPart(
              formattedParts.suffix,
              prevFormattedParts.suffix,
              decimalPartSize
            )}
          </div>
        )}
      </div>
      
      {suffix && (
        <span 
          className="ml-1" 
          style={suffixSize ? { fontSize: suffixSize } : {}}
          dangerouslySetInnerHTML={{ __html: suffix }} 
        />
      )}
    </div>
  );
};
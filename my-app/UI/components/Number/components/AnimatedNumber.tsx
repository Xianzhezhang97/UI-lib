import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatedNumberProps, FormattedNumberParts } from '../types';
import { formatNumber, parseFormattedNumber } from '../utils/formatters';
import { Digit } from './Digit';

/**
 * AnimatedNumber Component
 * Displays a number with various formatting options and animations
 */
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
  currencySymbolSize,
  integerPartSize,
  decimalPartSize,
  suffixSize
}) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [formattedParts, setFormattedParts] = useState<FormattedNumberParts>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    suffix: '',
    fullText: ''
  });
  const [prevFormattedParts, setPrevFormattedParts] = useState<FormattedNumberParts>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    suffix: '',
    fullText: ''
  });
  const prevValueRef = useRef(startValue);

  // Update animation when value changes
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

  /**
   * Calculate animation delay based on character position
   */
  const calculateDelay = (index: number, totalLength: number, changed: boolean) => {
    if (!changed || animation === 'none') return 0;
    const reverseIndex = totalLength - 1 - index;
    return reverseIndex * delayPerChar;
  };

  /**
   * Render a part of the number (digits, symbols, etc.)
   */
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

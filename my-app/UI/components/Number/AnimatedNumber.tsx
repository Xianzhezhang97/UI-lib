import { cn } from '@/utils/cn';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export type NumberFormat =
  | 'none'
  | 'currency'
  | 'percentage'
  | 'decimal';

export type NumberType = 
  | 'standard'    // 标准数字格式
  | 'scientific'  // 科学计数法
  | 'engineering';// 工程计数法

export type AnimationType = 'flip' | 'slide' | 'fade' | 'none';

interface AnimatedNumberProps {
  value: number | string;
  format?: NumberFormat;
  animation?: AnimationType;
  duration?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  maxNumberPlaces?: number;
  delayPerChar?: number;
  currencyType?: string;
  useShortFormat?: boolean;
  numberType?: NumberType;
  currencySymbolSize?: string;
  integerPartSize?: string;
  decimalPartSize?: string;
  suffixSize?: string;
  commaWidth?: string;
}

const parseFormattedNumber = (
  formattedValue: string,
  format: NumberFormat,
  locale: string,
  currencyType: string
): { currencySymbol: string, integerPart: string, decimalPart: string } => {
  let result = {
    currencySymbol: '',
    integerPart: formattedValue,
    decimalPart: ''
  };

  if (format === 'currency') {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyType
    });
    const parts = formatter.formatToParts(0);
    const currencySymbol = parts.find(part => part.type === 'currency')?.value || '';
    
    const symbolIndex = formattedValue.indexOf(currencySymbol);
    if (symbolIndex !== -1) {
      result.currencySymbol = currencySymbol;
      const valueWithoutSymbol = formattedValue.replace(currencySymbol, '').trim();
      
      const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
      const separatorIndex = valueWithoutSymbol.indexOf(decimalSeparator);
      
      if (separatorIndex !== -1) {
        result.integerPart = valueWithoutSymbol.substring(0, separatorIndex);
        result.decimalPart = decimalSeparator + valueWithoutSymbol.substring(separatorIndex + 1);
      } else {
        result.integerPart = valueWithoutSymbol;
      }
    }
  } else {
    const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);
    const separatorIndex = formattedValue.indexOf(decimalSeparator);
    
    if (separatorIndex !== -1) {
      result.integerPart = formattedValue.substring(0, separatorIndex);
      result.decimalPart = decimalSeparator + formattedValue.substring(separatorIndex + 1);
    }
  }

  return result;
};

const formatNumber = (
  value: number | string,
  format: NumberFormat = 'none',
  decimalPlaces: number = 0,
  locale: string = 'en-US',
  currencyType: string = 'USD',
  useShortFormat: boolean = false,
  numberType: NumberType = 'standard',
  maxNumberPlaces: number = 0
): string => {
  if (typeof value === 'string') return value;
  if (typeof value !== 'number') return '';
  const num = Number(value);

  const calculateDecimalPlaces = (num: number, isShortFormat: boolean): number => {
    if (maxNumberPlaces <= 0) return decimalPlaces;
    
    const absNum = Math.abs(num);
    if (absNum === 0) return decimalPlaces;
    
    let integerDigits = absNum >= 1 ? Math.floor(Math.log10(absNum)) + 1 : 0;
    
    if (isShortFormat) {
      if (absNum >= 1e3 && absNum < 1e6) integerDigits -= 3;
      else if (absNum >= 1e6 && absNum < 1e9) integerDigits -= 6;
      else if (absNum >= 1e9 && absNum < 1e12) integerDigits -= 9;
      else if (absNum >= 1e12 && absNum < 1e15) integerDigits -= 12;
      else if (absNum >= 1e15) integerDigits -= 15;
    }
    
    return Math.max(0, maxNumberPlaces - integerDigits);
  };

  const applyShortFormat = (num: number): string => {
    const absNum = Math.abs(num);
    let divisor = 1;
    let suffix = '';
    
    if (absNum >= 1e15) { divisor = 1e15; suffix = 'Q'; }
    else if (absNum >= 1e12) { divisor = 1e12; suffix = 'T'; }
    else if (absNum >= 1e9) { divisor = 1e9; suffix = 'B'; }
    else if (absNum >= 1e6) { divisor = 1e6; suffix = 'M'; }
    else if (absNum >= 1e3) { divisor = 1e3; suffix = 'K'; }

    const scaledNum = num / divisor;
    const actualDecimalPlaces = calculateDecimalPlaces(scaledNum, true);
    
    let formatted = scaledNum.toFixed(actualDecimalPlaces);
    if (actualDecimalPlaces > 0) {
      formatted = formatted.replace(/\.?0+$/, '');
      if (formatted.endsWith('.')) formatted = formatted.slice(0, -1);
    }
    
    return `${formatted}${suffix}`;
  };

  const applyCurrencyShortFormat = (num: number): string => {
    const absNum = Math.abs(num);
    let divisor = 1;
    let suffix = '';
    
    if (absNum >= 1e15) { divisor = 1e15; suffix = 'Q'; }
    else if (absNum >= 1e12) { divisor = 1e12; suffix = 'T'; }
    else if (absNum >= 1e9) { divisor = 1e9; suffix = 'B'; }
    else if (absNum >= 1e6) { divisor = 1e6; suffix = 'M'; }
    else if (absNum >= 1e3) { divisor = 1e3; suffix = 'K'; }

    const scaledNum = num / divisor;
    const actualDecimalPlaces = calculateDecimalPlaces(scaledNum, true);
    
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyType,
    });
    const symbol = formatter.formatToParts(0).find(part => part.type === 'currency')?.value || '';
    
    let formatted = scaledNum.toFixed(actualDecimalPlaces);
    if (actualDecimalPlaces > 0) {
      formatted = formatted.replace(/\.?0+$/, '');
      if (formatted.endsWith('.')) formatted = formatted.slice(0, -1);
    }
    
    return divisor === 1 
      ? formatter.format(num)
      : `${symbol}${formatted}${suffix}`;
  };

  const formatWithSignificantDigits = (num: number, type: 'scientific' | 'engineering'): string => {
    let significantDigits = decimalPlaces + 1;
    if (maxNumberPlaces > 0) {
      significantDigits = Math.min(maxNumberPlaces, 21);
    }
    
    let formatted = num.toExponential( significantDigits - 1 );
    const toSuperscript = (numStr: string) => {
  const superscripts: { [key: string]: string } = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵',
    '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻'
  };
  return numStr.split('').map(c => superscripts[c] || c).join('');
};
    
    if (type === 'engineering') {
      const match = formatted.match(/^(.*?)e([+-]?\d+)$/);
      if (match) {
        let coefficient = parseFloat(match[1]);
        let exponent = parseInt(match[2], 10);
        
        const remainder = exponent % 3;
        if (remainder !== 0) {
          exponent -= remainder;
          coefficient *= Math.pow(10, remainder);
          
          const newSignificantDigits = Math.max(0, significantDigits - Math.floor(Math.log10(Math.abs(coefficient))) - 1);
          coefficient = parseFloat(coefficient.toFixed(newSignificantDigits));
        }
        
        formatted = `${coefficient}e${exponent >= 0 ? '' : ''}${exponent}`;
      }
      
      return formatted.replace(/e([+-]?\d+)/, (_, exp) => {
    const supExp = toSuperscript(exp);
    return `×10${supExp}`;
  });
    }
    
    return formatted;
  };

  const formatWithType = (num: number): string => {
    if (useShortFormat) return applyShortFormat(num);

    switch(numberType) {
      case 'scientific':
        return formatWithSignificantDigits(num, 'scientific');
      case 'engineering':
        return formatWithSignificantDigits(num, 'engineering');
      default:
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces
        }).format(num);
    }
  };

  switch (format) {
    case 'currency':
      return useShortFormat 
        ? applyCurrencyShortFormat(num)
        : new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyType,
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(num);
    case 'percentage':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(num);
    case 'decimal':
      return formatWithType(num);
    default:
      return formatWithType(num);
  }
};

const getVariants = (animation: AnimationType, duration: number, delay: number): Variants => {
  switch (animation) {
    case 'flip':
      return {
        enter: (direction: 'up' | 'down') => ({
          rotateX: direction === 'up' ? 90 : -90,
          opacity: 0,
          transition: {
            type: "tween",
            duration: duration / 2,
            delay: delay,
          }
        }),
        center: { 
          rotateX: 0, 
          opacity: 1,
          transition: {
            type: "tween",
            duration: duration / 2,
            delay: delay,
          }
        },
        exit: (direction: 'up' | 'down') => ({
          rotateX: direction === 'up' ? -90 : 90,
          opacity: 0,
          transition: { 
            type: "tween",
            duration: duration / 2,
          }
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
            type: "tween",
            duration: duration / 2,
            delay: delay,
          }
        },
        exit: (direction: 'up' | 'down') => ({
          y: direction === 'up' ? '-100%' : '100%',
          opacity: 0,
          transition: { 
            type: "tween",
            duration: duration / 2,
          }
        })
      };
    case 'fade':
      return {
        enter: { opacity: 0 },
        center: { 
          opacity: 1,
          transition: { 
            type: "tween",
            duration: duration / 2,
            delay: delay,
          }
        },
        exit: { 
          opacity: 0,
          transition: { 
            type: "tween",
            duration: duration / 2,
          }
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
  commaWidth?: string;
}> = ({ value, prevValue, animation, duration, delay, fontSize, commaWidth }) => {
  const variants = getVariants(animation, duration, delay);
  const hasChanged = value !== prevValue;
  const direction = hasChanged 
    ? (Number(value.toString()) > Number(prevValue.toString()) ? 'up' : 'down')
    : 'up';

  const style = fontSize ? { fontSize } : {};
  
  const isComma = value === ',';
  const isDecimalPoint = value === '.';
  
  const separatorStyle = isComma ? { 
    width: commaWidth || '0.4em',
    minWidth: commaWidth || '0.4em',
    margin: '0 -0.05em' 
  } : isDecimalPoint ? {
    width: '0.3em',
    minWidth: '0.3em',
    margin: '0 -0.1em'
  } : {};

  if (animation === 'none') {
    return (
      <div 
        className={`relative inline-flex items-center justify-center font-medium ${
          isComma || isDecimalPoint ? 'text-gray-900' : ''
        }`}
        style={{ ...style, ...separatorStyle }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <div 
      className="relative inline-flex overflow-hidden items-center justify-center"
      style={{ 
        width: isComma ? (commaWidth || '0.4em') : 
               isDecimalPoint ? '0.4em' : '0.8em',
        minWidth: isComma ? (commaWidth || '0.4em') : 
                  isDecimalPoint ? '0.4em' : '0.8em',
        height: '1em',
        margin: isComma ? '0 -0.05em' : 
                isDecimalPoint ? '0 -0.05em' : '0',
        ...style
      }}
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
              className={`absolute inset-0 flex items-center justify-center font-medium ${
                isComma || isDecimalPoint ? 'text-gray-900' : ''
              }`}
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
              className={`absolute inset-0 flex items-center justify-center font-medium ${
                isComma || isDecimalPoint ? 'text-gray-500' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </>
        ) : (
          <div 
            className={`absolute inset-0 flex items-center justify-center font-medium ${
              isComma || isDecimalPoint ? 'text-gray-500' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  format = 'none',
  animation = 'slide',
  duration = 0.5,
  decimalPlaces = 0,
  prefix = '',
  suffix = '',
  locale = 'en-US',
  maxNumberPlaces = 0,
  delayPerChar = 0.05,
  currencyType = 'USD',
  useShortFormat = false,
  numberType = 'standard',
  currencySymbolSize,
  integerPartSize,
  decimalPartSize,
  suffixSize,
  commaWidth = '0.4em'
}) => {
  const [formattedParts, setFormattedParts] = useState<{
    currencySymbol: string;
    integerPart: string;
    decimalPart: string;
    fullText: string;
  }>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    fullText: ''
  });
  const [prevFormattedParts, setPrevFormattedParts] = useState<{
    currencySymbol: string;
    integerPart: string;
    decimalPart: string;
    fullText: string;
  }>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    fullText: ''
  });
  const prevValueRef = useRef(0);

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
        numberType,
        maxNumberPlaces
      );
      
      const parsedParts = parseFormattedNumber(formatted, format, locale, currencyType);
      
      setFormattedParts({
        ...parsedParts,
        fullText: formatted
      });
      
      prevValueRef.current = numValue;
    }
  }, [value, format, decimalPlaces, locale, currencyType, useShortFormat, numberType, maxNumberPlaces]);

  const calculateDelay = (index: number, totalLength: number, changed: boolean) => {
    if (!changed || animation === 'none') return 0;
    const reverseIndex = totalLength - 1 - index;
    return reverseIndex * delayPerChar;
  };

  const renderPart = (text: string, prevText: string, partFontSize?: string) => {
    const chars = text.split('');
    const prevChars = prevText ? prevText.split('') : Array(chars.length).fill(' ');
    
    return chars.map((char, index) => {
      const prevChar = prevChars[index] || ' ';
      const changed = prevChar !== char && prevChar !== ' ';
      const delay = calculateDelay(index, chars.length, changed);
      
      return (
        <Digit
          key={`${index}-${char}`}
          value={char}
          prevValue={prevChar}
          animation={animation}
          duration={duration}
          delay={delay}
          fontSize={partFontSize}
          commaWidth={commaWidth}
        />
      );
    });
  };

  return (
    <div
      className={cn(
        'inline-flex items-center text-base font-medium tabular-nums',
      )}
    >
      {prefix && <span className="mr-1" dangerouslySetInnerHTML={{ __html: prefix }} />}
      
      <div className="flex overflow-hidden items-baseline">
        {formattedParts.currencySymbol && (
          <div className="flex" style={currencySymbolSize ? { fontSize: currencySymbolSize } : {}}>
            {renderPart(
              formattedParts.currencySymbol, 
              prevFormattedParts.currencySymbol, 
              currencySymbolSize
            )}
          </div>
        )}
        
        <div className="flex" style={integerPartSize ? { fontSize: integerPartSize } : {}}>
          {renderPart(
            formattedParts.integerPart, 
            prevFormattedParts.integerPart,
            integerPartSize
          )}
        </div>
        
        {formattedParts.decimalPart && (
          <div className="flex" style={decimalPartSize ? { fontSize: decimalPartSize } : {}}>
            {renderPart(
              formattedParts.decimalPart, 
              prevFormattedParts.decimalPart,
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
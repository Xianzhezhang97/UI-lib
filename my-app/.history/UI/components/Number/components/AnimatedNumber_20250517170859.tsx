import { cn } from '@/UI/utils/cn';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { AnimatedNumberProps, FormattedNumberParts } from '../types';
import { variants } from '../utils/animationVariants';
import { formatNumber, parseFormattedNumber } from '../utils/formatters';
import Digit from './Digit';

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
  useShortFormat = 2,
  numberType = 'standard',
  currencySymbolSize,
  integerPartSize,
  decimalPartSize,
  suffixSize,
  maxSignificantDigits = 3,
  size = 'md',
  fontWeight = 'semibold',
  textColor = 'text-gray-700',
  animate = true,
}) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [formattedParts, setFormattedParts] = useState<FormattedNumberParts>({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    suffix: '',
    fullText: '',
  });
  const [prevFormattedParts, setPrevFormattedParts] =
    useState<FormattedNumberParts>({
      currencySymbol: '',
      integerPart: '',
      decimalPart: '',
      suffix: '',
      fullText: '',
    });
  const prevValueRef = React.useRef(startValue);
  const [displayValue, setDisplayValue] = useState<string>('0');

  // Update animation when value changes
  useEffect(() => {
    const numValue =
      typeof value === 'number' ? value : parseFloat(value.toString());
    if (!isNaN(numValue)) {
      setPrevFormattedParts(formattedParts);

      // Determine how to handle useShortFormat based on its type
      // If it's a boolean false, don't use short format
      // If it's a boolean true, use short format with default maxDigits (3)
      // If it's a number, use that as the maxDigits for short format
      const shouldUseShortFormat = useShortFormat !== false;
      const shortFormatValue =
        typeof useShortFormat === 'number'
          ? useShortFormat
          : shouldUseShortFormat
            ? 3
            : false;

      const formatted = formatNumber(
        numValue,
        format,
        decimalPlaces,
        locale,
        currencyType,
        shortFormatValue,
        numberType,
      );

      // 解析并分离格式化后的数字
      // Handle boolean conversion for parsing function that expects boolean
      const parsedParts = parseFormattedNumber(
        formatted,
        format,
        locale,
        currencyType,
        shouldUseShortFormat,
      );

      setFormattedParts({
        ...parsedParts,
        fullText: formatted,
      });

      prevValueRef.current = currentValue;
      setCurrentValue(numValue);
    }
  }, [
    value,
    format,
    decimalPlaces,
    locale,
    currencyType,
    useShortFormat,
    numberType,
  ]);

  useEffect(() => {
    const formatted = formatNumber(value, useShortFormat, maxSignificantDigits);
    setDisplayValue(formatted);
  }, [value, useShortFormat, maxSignificantDigits]);

  /**
   * Calculate animation delay based on character position
   */
  const calculateDelay = (
    index: number,
    totalLength: number,
    changed: boolean,
  ) => {
    if (!changed || animation === 'none') return 0;
    const reverseIndex = totalLength - 1 - index;
    return reverseIndex * delayPerChar;
  };

  /**
   * Render a part of the number (digits, symbols, etc.)
   */
  const renderPart = (
    text: string,
    prevText: string,
    partFontSize?: string,
    isSymbol: boolean = false,
  ) => {
    const chars = text.split('');
    const prevChars = prevText
      ? prevText.split('')
      : Array(chars.length).fill(' ');

    return chars.map((char, index) => {
      const prevChar = prevChars[index] || ' ';
      const changed = prevChar !== char && prevChar !== ' ';
      const delay = calculateDelay(index, chars.length, changed);
      // 检查是否为特殊字符（小数点、逗号等）
      const isSpecialChar =
        char === '.' ||
        char === ',' ||
        char === ' ' ||
        char === "'" ||
        char === ' ';

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

  // Split the formatted value into individual characters for animation
  const digits = displayValue.split('');

  return (
    <div
      className={cn(
        'inline-flex items-center text-base font-medium tabular-nums',
        className,
        textColor,
      )}
      style={style}
    >
      {prefix && (
        <span
          className='mr-1'
          dangerouslySetInnerHTML={{ __html: prefix }}
        />
      )}

      <div className='flex items-baseline overflow-hidden'>
        {/* 货币符号部分 */}
        {formattedParts.currencySymbol && (
          <div
            className='flex'
            style={currencySymbolSize ? { fontSize: currencySymbolSize } : {}}
          >
            {renderPart(
              formattedParts.currencySymbol,
              prevFormattedParts.currencySymbol,
              currencySymbolSize,
              true, // 标记为符号，应用margin
            )}
          </div>
        )}

        {/* 整数部分 */}
        <div
          className='flex'
          style={integerPartSize ? { fontSize: integerPartSize } : {}}
        >
          {renderPart(
            formattedParts.integerPart,
            prevFormattedParts.integerPart,
            integerPartSize,
          )}
        </div>

        {/* 小数部分 */}
        {formattedParts.decimalPart && (
          <div
            className='flex'
            style={decimalPartSize ? { fontSize: decimalPartSize } : {}}
          >
            {renderPart(
              formattedParts.decimalPart,
              prevFormattedParts.decimalPart,
              decimalPartSize,
            )}
          </div>
        )}

        {/* 后缀 (K/M/B/%) */}
        {formattedParts.suffix && (
          <div
            className='flex'
            style={decimalPartSize ? { fontSize: decimalPartSize } : {}}
          >
            {renderPart(
              formattedParts.suffix,
              prevFormattedParts.suffix,
              decimalPartSize,
            )}
          </div>
        )}
      </div>

      {suffix && (
        <span
          className='ml-1'
          style={suffixSize ? { fontSize: suffixSize } : {}}
          dangerouslySetInnerHTML={{ __html: suffix }}
        />
      )}

      {/* Animated Digits */}
      <div className='flex'>
        {digits.map((char, index) => (
          <motion.div
            key={`${index}-${char}`}
            variants={animate ? variants : undefined}
            initial={animate ? 'initial' : undefined}
            animate={animate ? 'animate' : undefined}
            className={`font-${fontWeight}`}
          >
            <Digit
              char={char}
              size={size}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

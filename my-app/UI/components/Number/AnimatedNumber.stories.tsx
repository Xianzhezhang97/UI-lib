import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from './components/AnimatedNumber';

const meta: Meta<typeof AnimatedNumber> = {
  title: 'Components/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    layout: 'centered',
  },
  argTypes: {

    value: {
      control: { type: 'number'},
    },
    startValue: {
      control: { type: 'number'},
    },
    animation: {
      control: { type: 'select' },
      options: ['slide', 'flip', 'fade', 'none'],
    },
    format: {
      control: { type: 'select' },
      options: ['none', 'currency', 'percentage', 'decimal'],
    },
    currencyType: {
      control: { type: 'select' },
      options: ['CNY', 'AUD', 'USD', 'EUR', 'JPY', 'GBP', 'HKD', 'TWD'],
      if: { arg: 'format', eq: 'currency' },
    },
    useShortFormat: {
      control: { type: 'boolean' }
    },
    duration: {
      control: { type: 'range', min: 0.1, max: 10, step: 0.1 },
    },
    decimalPlaces: {
      control: { type: 'number' },
    },
    delayPerChar: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedNumber>;

const InteractiveDemo = (args: any) => {
  // State management - Two-way binding with Storybook Controls
  const [value, setValue] = useState(args.value || 0);
  const [animation, setAnimation] = useState(args.animation || 'slide');
  const [duration, setDuration] = useState(args.duration || 0.5);
  const [format, setFormat] = useState(args.format || 'none');
  const [currencyType, setCurrencyType] = useState(args.currencyType || 'USD');
  const [useShortFormat, setUseShortFormat] = useState(
    args.useShortFormat || false,
  );
  const [numberType, setNumberType] = useState(args.numberType || 'standard');
  const [decimalPlaces, setDecimalPlaces] = useState(args.decimalPlaces || 0);
  const [delayPerChar, setDelayPerChar] = useState(args.delayPerChar || 0.05);
  const [step, setStep] = useState(1);

  // Sync changes from Storybook Controls to component state
  useEffect(() => {
    if (args.value !== undefined) setValue(args.value);
    if (args.animation !== undefined) setAnimation(args.animation);
    if (args.duration !== undefined) setDuration(args.duration);
    if (args.format !== undefined) setFormat(args.format);
    if (args.currencyType !== undefined) setCurrencyType(args.currencyType);
    if (args.useShortFormat !== undefined)
      setUseShortFormat(args.useShortFormat);
    if (args.numberType !== undefined) setNumberType(args.numberType);
    if (args.decimalPlaces !== undefined) setDecimalPlaces(args.decimalPlaces);
    if (args.delayPerChar !== undefined) setDelayPerChar(args.delayPerChar);
  }, [args]);

  // Sync changes from component state to Storybook Controls
  const updateArgs = (newArgs: Partial<typeof args>) => {
    if (args.onChange) {
      args.onChange({ ...args, ...newArgs });
    }
  };

  return (
    <div className='flex flex-col gap-8 items-center p-6 max-w-md'>
      <div className='flex justify-between items-center'>
        <AnimatedNumber
          value={value}
          animation={animation}
          duration={duration}
          format={format}
          currencyType={currencyType}
          useShortFormat={useShortFormat}
          numberType={numberType}
          decimalPlaces={decimalPlaces}
          delayPerChar={delayPerChar}
          {...args}
          className='text-3xl font-bold'
        />
        
      </div>
      <input type="range" className="w-[400px]" value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    const handleChange = (newArgs: Partial<typeof args>) => {
      updateArgs(newArgs);
    };

    return (
      <InteractiveDemo
        {...args}
        onChange={handleChange}
      />
    );
  },
  args: {
    value: 1234,
    animation: 'slide',
    duration: 0.5,
    format: 'standard',
    currencyType: 'USD',
    useShortFormat: true,
    numberType: 'standard',
    decimalPlaces: 0,
    delayPerChar: 0.05,
    prefix: '',
    suffix: '',
  },
};

// 其他示例保持不变...
export const SlideAnimation: Story = {
  args: {
    value: 1234,
    animation: 'slide',
    duration: 0.5,
    className: 'text-3xl',
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '0.8em',
    suffixSize: '0.8em',
    useShortFormat: false,
  },
};

export const CurrencyFormat: Story = {
  args: {
    value: 563,
    format: 'currency',
    currencyType: 'AUD',
    animation: 'slide',
    duration: 0.5,
    className: 'text-3xl',
    useShortFormat: true,
    currencySymbolSize: '1em',
    integerPartSize: '1.2em',
    decimalPartSize: '1em',
    suffixSize: '1em',
  },
};

export const DecimalFormat: Story = {
  args: {
    value: 1234567,
    format: 'decimal',
    useShortFormat: false,
    numberType: 'standard',
    animation: 'slide',
    duration: 0.5,
    decimalPlaces: 1,
    className: 'text-3xl',
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '0.8em',
    suffixSize: '0.8em',
  },
};

export const ShortFormatDecimal: Story = {
  args: {
    value: 1234567,
    format: 'decimal',
    useShortFormat: true,
    numberType: 'standard',
    animation: 'slide',
    duration: 0.5,
    decimalPlaces: 1,
    className: 'text-3xl',
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '0.8em',
    suffixSize: '0.8em',
  },
};

export const ShortFormat: Story = {
  args: {
    value: 1234567,
    format: 'decimal',
    useShortFormat: true,
    numberType: 'standard',
    animation: 'slide',
    duration: 0.5,
    decimalPlaces: 1,
    className: 'text-3xl',
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '0.8em',
    suffixSize: '0.8em',
  },
};

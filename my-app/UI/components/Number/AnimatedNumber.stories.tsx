import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

const meta: Meta<typeof AnimatedNumber> = {
  title: 'Components/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex flex-col gap-8 items-center p-6 w-full max-w-md'>
        <Story />
      </div>
    ),
  ],

  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 1000000, step: 1 },
      // control: { type: 'number', min: 0, max: 1000000, step: 1 },
      description: 'The final value to animate to.',
    },
    animation: {
      control: { type: 'select' },
      options: ['slide', 'flip', 'fade', 'none'],
      description: 'The animation type to use.',
    },
    format: {
      control: { type: 'radio' },
      options: ['none', 'currency', 'percentage', 'decimal'],
      description: 'The format type to use.',
    },
    currencyType: {
      control: { type: 'radio' },
      options: ['CNY', 'AUD', 'USD', 'EUR', 'JPY', 'GBP', 'HKD', 'TWD'],
      if: { arg: 'format', eq: 'currency' },
      description: 'The currency type to use.',
    },
    numberType: {
      control: { type: 'radio' },
      options: [ 'standard', 'scientific', 'engineering' ],
      if: { arg: 'format', eq: 'none' },
      description: 'The number type to use.',
    },
    useShortFormat: {
      control: { type: 'boolean' },
      description: 'Whether to use short format.',
    },
    maxNumberPlaces: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'The maximum number of places to show.',
      if: { arg: 'useShortFormat', eq: true },
    },
    decimalPlaces: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'The number of decimal places to show.',
      if: { arg: 'useShortFormat', eq: false },
    },

    duration: {
      control: { type: 'range', min: 0.1, max: 10, step: 0.1 },
      description: 'The duration of the animation in seconds.',
    },
    delayPerChar: {
      control: { type: 'number', min: 0, max: 0.2, step: 0.01 },
      description: 'The delay between each character in seconds.',
    },
    prefix: {
      control: { type: 'text' },
      description: 'The prefix to show before the number.',
    },
    suffix: {
      control: { type: 'text' },
      description: 'The suffix to show after the number.',
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
    format: 'none',
    currencyType: 'USD',
    useShortFormat: true,
    numberType: 'standard',
    decimalPlaces: 0,
    delayPerChar: 0.05,
    prefix: '',
    suffix: '',
    currencySymbolSize: '1em',
    integerPartSize: '1.2em',
    decimalPartSize: '1em',
    suffixSize: '1em',
    maxNumberPlaces: 3,
  },
};

export const SlideAnimation: Story = {
  args: {
    value: 1234,
    animation: 'slide',
    duration: 0.5,
    currencySymbolSize: '1em',
    integerPartSize: '1.2em',
    decimalPartSize: '1em',
    suffixSize: '1em',
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
    currencySymbolSize: '1em',
    integerPartSize: '1.2em',
    decimalPartSize: '1em',
    suffixSize: '1em',
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
    currencySymbolSize: '1em',
    integerPartSize: '1.2em',
    decimalPartSize: '1em',
    suffixSize: '1em',
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
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '0.8em',
    suffixSize: '0.8em',
  },
};

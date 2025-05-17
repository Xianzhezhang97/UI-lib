// AnimatedNumber.stories.tsx
import { Button } from '@/UI/Components/Button/Button';
import { CopyButton } from '@/UI/Components/Button/CopyButton';
import { Input } from '@/UI/Components/Input/Input';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

const meta: Meta<typeof AnimatedNumber> = {
  title: 'Components/Data Display/AnimatedNumber',
  component: AnimatedNumber,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A highly customizable animated number display component with multiple formatting options and smooth transitions. 
        Supports currency, percentages, scientific notation, and engineering notation. Features configurable animations including 
        flip, slide, and fade effects.`,
      },
      source: {
        type: 'code',
        code: `
        <AnimatedNumber
          value={value}
          format="decimal"
          useShortFormat={true}
          numberType="standard"
          animation="slide"
          duration={0.5}
          decimalPlaces={1}
          currencySymbolSize="0.8em"
          integerPartSize="1.2em"
          decimalPartSize="0.8em"
          suffixSize="0.8em"
        />
        `,
      },
    },  
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'The numeric value to display',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '0' },
      },
    },
    format: {
      options: ['none', 'currency', 'percentage', 'decimal'],
      description: 'Number formatting style',
      table: { defaultValue: { summary: 'none' } },
    },
    animation: {
      options: ['flip', 'slide', 'fade', 'none'],
      description: 'Animation type for number transitions',
      table: { defaultValue: { summary: 'slide' } },
    },
    duration: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Animation duration in seconds',
      table: { defaultValue: { summary: '0.5' } },
    },
    decimalPlaces: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Number of decimal places',
      table: { defaultValue: { summary: '2' } },
    },
    currencySymbolSize: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Size of currency symbol',
      table: { defaultValue: { summary: '0.8em' } },
    },
    integerPartSize: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Size of integer part',
      table: { defaultValue: { summary: '1.2em' } },
    },
    decimalPartSize: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Size of decimal part',
      table: { defaultValue: { summary: '0.8em' } },
    },
    suffixSize: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Size of suffix',
      table: { defaultValue: { summary: '0.8em' } },
    },
    useShortFormat: {
      control: 'boolean',
      description: 'Use short format for large numbers',
      table: { defaultValue: { summary: 'false' } },
    },
    numberType: {
      options: ['standard', 'engineering', 'scientific'],
      description: 'Number type for formatting',
      table: { defaultValue: { summary: 'standard' } },
    },
    currencyType: {
      options: ['AUD', 'USD', 'EUR', 'GBP', 'JPY', 'CNY'],
      description: 'Currency type for formatting',
      table: { defaultValue: { summary: 'AUD' } },
    },
    maxNumberPlaces: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Maximum number of decimal places',
      table: { defaultValue: { summary: '2' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedNumber>;

// 交互式演示组件
const InteractiveDemo = (props: any) => {
  const [value, setValue] = useState(1234567.89);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = useCallback((newValue: number) => {
    setValue(newValue);
    setInputValue(newValue.toString());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      handleChange(newValue);
    }
    setInputValue(e.target.value);
  };

  return (
    <div className='space-y-8 min-w-[600px]'>
      {/* 组件展示 */}
      <div className='border p-6 rounded-lg bg-background shadow-lg'>
        <AnimatedNumber
          value={value}
          {...props}
          suffixSize='1.5em'
          integerPartSize='1.2em'
          decimalPartSize='1em'
          currencySymbolSize='1em'
        />
      </div>

      {/* 控制面板 */}
      <div className='bg-gray-100 p-4 rounded-lg space-y-4'>
        <div className='grid grid-cols-3 gap-4'>
          <Button onClick={() => handleChange(value * 1.1)}>+10%</Button>
          <Button onClick={() => handleChange(value / 1.1)}>-10%</Button>
          <Button onClick={() => handleChange(0)}>Reset</Button>
        </div>

        <input
          type='range'
          value={value}
          min={-10000000}
          max={10000000}
          step={1000}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
        />

        <Input
          type='number'
          value={inputValue}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
          className='text-lg'
        />
      </div>


      {/* 实时配置生成器 */}
      {/* <Tabs defaultValue='react'>
        <TabsList>
          <TabsTrigger value='react'>React</TabsTrigger>
          <TabsTrigger value='vue'>Vue</TabsTrigger>
          <TabsTrigger value='angular'>Angular</TabsTrigger>
        </TabsList>

        <TabsContent value='react'>
          <CodeBlock
            code={`
<AnimatedNumber
  value={${value}}
  format="${props.format}"
  animation="${props.animation}"
  duration={${props.duration}}
  ${props.currencyType ? `currencyType="${props.currencyType}"` : ''}
  ${props.numberType !== 'standard' ? `numberType="${props.numberType}"` : ''}
  ${props.useShortFormat ? 'useShortFormat' : ''}
  // 其他参数...
/>
            `}
          />
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

// 代码展示组件
const CodeBlock = ({ code }: { code: string }) => (
  <div className='relative bg-gray-800 rounded-md p-4 mt-4'>
    <pre className='text-gray-100 text-sm font-mono overflow-x-auto'>
      <code>{code}</code>
    </pre>
    <div className='absolute top-2 right-2'>
      <CopyButton text={code} />
    </div>
  </div>
);

// 基础示例
export const Basic: Story = {
  render: () => <InteractiveDemo />,
};

export const SlideAnimation: Story = {
  args: {
    value: 1234,
    animation: 'slide',
    duration: 0.5,
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '0.8em',
    suffixSize: '0.8em',
    useShortFormat: false,
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100000000, step: 1 },
    },
  },
};

export const CurrencyFormat: Story = {
  args: {
    value: 168.79,
    format: 'currency',
    currencyType: 'AUD',
    animation: 'slide',
    duration: 0.5,
    useShortFormat: true,
    currencySymbolSize: '1em',
    integerPartSize: '1.2em',
    decimalPartSize: '1em',
    suffixSize: '1em',
    decimalPlaces: 2,
  },
  argTypes: {
    useShortFormat: {
      control: 'boolean',
    },
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
    currencySymbolSize: '0.8em',
    integerPartSize: '1.2em',
    decimalPartSize: '1.2em',
    suffixSize: '1.2em',
    maxNumberPlaces: 3,
  },
};

export const AllFormat: Story = {
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

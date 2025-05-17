import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';
import { cn } from '@/utils/cn';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  className?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  value: number[];
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue = false, formatValue, ...props }, ref) => {
  const defaultFormatValue = (value: number) => `${value}`;
  const formatter = formatValue || defaultFormatValue;

  return (
    <div className="relative">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {props.value.map((value: number, index: number) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            data-value={value}
          />
        ))}
      </SliderPrimitive.Root>
      
      {showValue && (
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          {props.value.map((value: number, index: number) => (
            <span key={index}>{formatter(value)}</span>
          ))}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

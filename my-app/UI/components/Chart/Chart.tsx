import React from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import ChartWrapper from './ChartWrapper';
import LineChart from './LineChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'bar' | 'line' | 'area' | 'pie' | 'radar';
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  multiColor?: boolean;
  className?: string;
  showGridX?: boolean;
  showGridY?: boolean;
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({
    className,
    type = 'bar',
    data = [],
    xKey,
    yKey,
    title,
    size = 'md',
    color = '#3b82f6',
    multiColor = true,
    showGridX = false,
    showGridY = false,
    ...props
  }, ref) => {
    const getChartComponent = (type: ChartProps['type']) => {
      switch (type) {
        case 'bar':
          return <BarChart data={data} xKey={xKey} yKey={yKey} color={color} multiColor={multiColor} />;
        case 'line':
          return <LineChart data={data} xKey={xKey} yKey={yKey} color={color} />;
        case 'area':
          return <AreaChart data={data} xKey={xKey} yKey={yKey} color={color} />;
        case 'pie':
          return <PieChart data={data} xKey={xKey} yKey={yKey} color={color} />;
        case 'radar':
          return <RadarChart data={data} xKey={xKey} yKey={yKey} color={color} />;
        default:
          return null;
      }
    };

    // 确保有有效的数据和必要的键名
    if (!data || data.length === 0 || !xKey) {
      return (
        <ChartWrapper title={title || '无数据'} size={size} className={className}>
          <div className="flex h-full w-full items-center justify-center text-gray-500">
            没有数据可显示
          </div>
        </ChartWrapper>
      );
    }
    
    return (
      <ChartWrapper title={title} size={size} className={className}>
        <div ref={ref} style={{ width: '100%', height: '100%' }} {...props}>
          {getChartComponent(type)}
        </div>
      </ChartWrapper>
    );
  }
);

Chart.displayName = 'Chart';

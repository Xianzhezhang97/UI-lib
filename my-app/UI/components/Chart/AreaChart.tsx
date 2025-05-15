import
  {
    Area,
    CartesianGrid,
    AreaChart as RechartsAreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
  } from 'recharts';

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  multiColor?: boolean;
  showXAxis?: boolean;      // 是否显示X轴
  showYAxis?: boolean;      // 是否显示Y轴
  showValues?: boolean;     // 是否显示值
  showGrid?: boolean;       // 是否显示网格线
  gridType?: 'horizontal' | 'vertical' | 'both';  // 网格线类型
}

// Modern color palette
const COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#f43f5e', // Rose
  '#84cc16', // Lime
];

// Create multiple areas for different data series
const generateMultiAreas = (data: any[], xKey: string) => {
  // Safety check
  if (!data || data.length === 0) return null;
  
  // Get all numeric data keys (exclude the xKey)
  const keys = Object.keys(data[0] || {}).filter(key => {
    return key !== xKey && typeof data[0][key] === 'number';
  });
  
  return keys.map((key, index) => {
    const color = COLORS[index % COLORS.length];
    return (
      <Area
        key={key}
        type="monotone"
        dataKey={key}
        name={key}
        stroke={color}
        fill={color}
        fillOpacity={0.3}
        stackId="1"
        dot={{
          strokeWidth: 2,
          stroke: color,
          fill: color,
          r: 4,
        }}
        activeDot={{ r: 6 }}
        animationDuration={1000}
        animationBegin={index * 100}
        isAnimationActive={true}
      />
    );
  });
};

const AreaChart = ({ 
  data, 
  xKey, 
  yKey, 
  color = '#3b82f6', 
  multiColor = true,
  showXAxis = true,
  showYAxis = true,
  showValues = true,
  showGrid = true,
  gridType = 'both'
}: AreaChartProps) => {
  // Check if data has multiple series
  const hasMultipleSeries = data && data.length > 0 && 
    Object.keys(data[0] || {}).filter(key => 
      key !== xKey && typeof data[0][key] === 'number'
    ).length > 1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted-foreground/20"
            vertical={gridType === 'both' || gridType === 'vertical'}
            horizontal={gridType === 'both' || gridType === 'horizontal'}
          />
        )}
        {showXAxis && (
          <XAxis
            dataKey={xKey}
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)' }}
          />
        )}
        {showYAxis && (
          <YAxis
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)' }}
            domain={[
              (dataMin: number) => Math.floor(dataMin * 0.7),          
              (dataMax: number) => Math.ceil(dataMax * 1.1)         
            ]}
          />
        )}
        <Tooltip
     contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: 'var(--foreground)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)'
          }}
          labelStyle={{ color: 'var(--muted-foreground)', fontWeight: 'bold' }}
          itemStyle={{ color: 'var(--foreground)' }}
          cursor={ { fill: 'var(--muted-foreground)', fillOpacity: 0.05 } }
        />

        {hasMultipleSeries && multiColor ? (
          generateMultiAreas(data, xKey)
        ) : (
          <Area
            type="monotone"
            dataKey={yKey}
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1000}
            animationBegin={0}
            isAnimationActive={true}
          />
        )}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;

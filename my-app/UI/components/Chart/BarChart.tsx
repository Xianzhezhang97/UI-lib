import
  {
    Bar,
    CartesianGrid,
    Cell,
    BarChart as RechartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
  } from 'recharts';

interface BarChartProps
{
  title?: string;
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  multiColor?: boolean;
  showXAxis?: boolean;      // 是否显示X轴
  showYAxis?: boolean;      // 是否显示Y轴
  showValues?: boolean;     // 是否显示值
  showGridX?: boolean;       // 是否显示X轴网格线
  showGridY?: boolean;       // 是否显示Y轴网格线
  gridType?: 'horizontal' | 'vertical' | 'both';  // 网格线类型
}

// Modern color palette with bright, accessible colors
const COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#f43f5e', // Rose
  '#84cc16', // Lime
  '#fb7185', // Light Rose
  '#60a5fa', // Light Blue
  '#a78bfa', // Light Purple
  '#34d399', // Light Green
];



// Handle multi-series bar charts
const generateMultiBars = (data: any[], xKey: string) => {
  // Safety check
  if (!data || data.length === 0) return null;
  
  // Get all numeric data keys (exclude the xKey)
  const keys = Object.keys(data[0] || {}).filter(key => {
    return key !== xKey && typeof data[0][key] === 'number';
  });
  
  return keys.map((key, index) => (
    <Bar
      key={key}
      dataKey={key}
      name={key}
      fill={COLORS[index % COLORS.length]}
      radius={[4, 4, 0, 0]}
      animationDuration={1000}
      animationBegin={index * 100}
      isAnimationActive={true}
    />
  ));
};

const BarChart = ({ 
  data, 
  xKey, 
  yKey, 
  title, 
  color = '#3b82f6', 
  multiColor = true,
  showXAxis = true,
  showYAxis = false,
  showValues = true,
  showGridX = false,
  showGridY = false,
  gridType = 'both'
}: BarChartProps) => {
  // Check if data has multiple series
  const hasMultipleSeries = data && data.length > 0 && 
    Object.keys(data[0] || {}).filter(key => 
      key !== xKey && typeof data[0][key] === 'number'
    ).length > 1;

  // Safety check
  if (!data || data.length === 0 || !xKey || (hasMultipleSeries ? false : !yKey)) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        No data available or missing key properties
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={ data }>
        {title}
        {showGridX && (
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted-foreground/20"
            vertical={gridType === 'both' || gridType === 'vertical'}
            horizontal={false}
          />
        )}
        {showGridY && (
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted-foreground/20"
            vertical={false}
            horizontal={ gridType === 'both' || gridType === 'horizontal'}
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
          generateMultiBars(data, xKey)
        ) : (
          <Bar
            dataKey={yKey}
            name={yKey}
            fill={color}
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
            animationBegin={0}
            isAnimationActive={true}
          >
            {multiColor && data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="var(--background)"
                strokeWidth={1}
              />
            ))}
          </Bar>
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;

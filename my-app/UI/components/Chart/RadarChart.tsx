import
  {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart as RechartsRadarChart,
    ResponsiveContainer,
    Tooltip
  } from 'recharts';

interface RadarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  multiColor?: boolean;
  showAxes?: boolean;      // 是否显示轴
  showValues?: boolean;    // 是否显示值
  showGrid?: boolean;      // 是否显示网格线
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

// Generate multiple radars for different data series
const generateMultiRadars = (data: any[], xKey: string) => {
  // Safety check
  if (!data || data.length === 0) return null;
  
  // Get all numeric data keys (exclude the xKey)
  const keys = Object.keys(data[0] || {}).filter(key => {
    return key !== xKey && typeof data[0][key] === 'number';
  });
  
  return keys.map((key, index) => {
    const color = COLORS[index % COLORS.length];
    return (
      <Radar
        key={key}
        name={key}
        dataKey={key}
        stroke={color}
        fill={color}
        fillOpacity={0.3}
        animationDuration={1000}
        animationBegin={ index * 150 }
        isAnimationActive={true}
      />
    );
  });
};

const RadarChart = ({ 
  data, 
  xKey, 
  yKey, 
  color = '#3b82f6', 
  multiColor = true,
  showAxes = true,
  showValues = true,
  showGrid = true
}: RadarChartProps) => {
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
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        {showGrid && (
          <PolarGrid 
            strokeDasharray="3 3" 
            stroke="var(--muted-foreground)" 
            strokeOpacity={0.3} 
          />
        )}
        {showAxes && (
          <>
            <PolarAngleAxis 
              dataKey={xKey} 
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              stroke="var(--muted-foreground)"
              strokeOpacity={0.3}
            />
            <PolarRadiusAxis 
              tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
              axisLine={false}
              tickCount={5}
              stroke="var(--muted-foreground)"
              strokeOpacity={0.3}
            />
          </>
        )}
        {hasMultipleSeries && multiColor ? (
          generateMultiRadars(data, xKey)
        ) : (
          <Radar
            name={yKey}
            dataKey={yKey}
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            animationDuration={1000}
            animationBegin={0}
            isAnimationActive={true}
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
          } }
          labelStyle={{ color: 'var(--muted-foreground)', fontWeight: 'bold' }}
          itemStyle={{ color: 'var(--foreground)' }}
          cursor={ { fill: 'var(--muted-foreground)', fillOpacity: 0.05 } }
        />

      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;

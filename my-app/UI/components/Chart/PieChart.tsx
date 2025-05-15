import
  {
    Cell,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip
  } from 'recharts';

interface PieChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  multiColor?: boolean;
  showGrid?: boolean;       // 是否显示网格线
  showValues?: boolean;     // 是否显示值
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

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent > 0.05) {
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return null;
};

const PieChart = ({ 
  data, 
  xKey, 
  yKey, 
  color, 
  multiColor = true,
  showGrid = true,
  showValues = true
}: PieChartProps) => {
  // Safety check
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          nameKey={xKey}
          dataKey={yKey}
          outerRadius={90}
          innerRadius={40}
          label={showValues ? renderCustomizedLabel : undefined}
          paddingAngle={2}
          animationDuration={1000}
          animationBegin={0}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={!multiColor ? color || COLORS[0] : COLORS[index % COLORS.length]}
              stroke="var(--background)"
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip
        contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'var(--foreground)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)'
          }}
          // labelStyle={{ color: 'var(--muted-foreground)', fontWeight: 'bold' }}
          itemStyle={{ color: 'var(--foreground)' }}
          // cursor={ { fill: 'var(--muted-foreground)', fillOpacity: 0.05 } }
        />
     
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;

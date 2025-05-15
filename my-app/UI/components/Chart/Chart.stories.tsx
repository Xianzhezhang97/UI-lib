import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
  title: 'UI/Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'area', 'pie', 'radar'],
      description: 'Type of chart to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chart',
    },
    color: {
      control: 'color',
      description: 'Primary color for the chart',
    },
    multiColor: {
      control: 'boolean',
      description: 'Use multiple colors for data points',
    },
    title: {
      control: 'text',
      description: 'Chart title',
    },
    data: {
      description: 'Data to display in the chart',
    },
    xKey: {
      control: 'text',
      description: 'Key for X-axis data',
    },
    yKey: {
      control: 'text',
      description: 'Key for Y-axis data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// Sample data for our charts
const barData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const lineData = [
  { month: 'Jan', revenue: 1000 },
  { month: 'Feb', revenue: 1500 },
  { month: 'Mar', revenue: 1200 },
  { month: 'Apr', revenue: 1800 },
  { month: 'May', revenue: 2000 },
  { month: 'Jun', revenue: 2500 },
];

// Multi-series data
const multiLineData = [
  { month: 'Jan', sales: 1000, profit: 500, customers: 300 },
  { month: 'Feb', sales: 1500, profit: 700, customers: 400 },
  { month: 'Mar', sales: 1200, profit: 600, customers: 500 },
  { month: 'Apr', sales: 1800, profit: 900, customers: 600 },
  { month: 'May', sales: 2000, profit: 1000, customers: 700 },
  { month: 'Jun', sales: 2500, profit: 1200, customers: 800 },
];

const areaData = [
  { date: '2023-01', users: 4000 },
  { date: '2023-02', users: 3000 },
  { date: '2023-03', users: 5000 },
  { date: '2023-04', users: 7000 },
  { date: '2023-05', users: 6000 },
  { date: '2023-06', users: 8000 },
];

// Multi-series area data
const multiAreaData = [
  { date: '2023-01', desktop: 2000, mobile: 1500, tablet: 500 },
  { date: '2023-02', desktop: 1800, mobile: 2000, tablet: 600 },
  { date: '2023-03', desktop: 2200, mobile: 2500, tablet: 700 },
  { date: '2023-04', desktop: 2500, mobile: 3000, tablet: 800 },
  { date: '2023-05', desktop: 2300, mobile: 3500, tablet: 900 },
  { date: '2023-06', desktop: 2800, mobile: 4000, tablet: 1000 },
];

const pieData = [
  { category: 'Mobile', sales: 4000 },
  { category: 'Desktop', sales: 3000 },
  { category: 'Tablet', sales: 2000 },
  { category: 'Other', sales: 1000 },
];

// Radar chart data
const radarData = [
  { subject: 'Math', score: 80 },
  { subject: 'Chinese', score: 90 },
  { subject: 'English', score: 70 },
  { subject: 'Physics', score: 85 },
  { subject: 'Chemistry', score: 75 },
  { subject: 'Biology', score: 80 },
];

// Bar Chart examples
export const BarChartExample: Story = {
  args: {
    type: 'bar',
    data: barData,
    xKey: 'name',
    yKey: 'value',
    title: 'Monthly Performance',
    multiColor: true,
    showGridX: true,
    showGridY: false,
    size: 'md',
    color: 'rgba(0, 0, 0, 0)',
  },
};

export const BarChartCustomColor: Story = {
  args: {
    ...BarChartExample.args,
    color: '#10b981', // Green
    title: 'Monthly Performance (Custom Color)',
    multiColor: false,
  },
};

export const BarChartLarge: Story = {
  args: {
    ...BarChartExample.args,
    size: 'lg',
    title: 'Monthly Performance (Large)',
    color: '#0be03d',
  },
};

// Line Chart examples
export const LineChartExample: Story = {
  args: {
    type: 'line',
    data: lineData,
    xKey: 'month',
    yKey: 'revenue',
    title: 'Monthly Revenue',
  },
};

export const LineChartMultiSeries: Story = {
  args: {
    type: 'line',
    data: multiLineData,
    xKey: 'month', // 修复键名，移除了错误的感叹号
    yKey: 'sales',
    title: 'Sales, Profit & Customers',
    multiColor: true,
    color: '#b90f0f',
    size: 'md',
    className: '',
    showGridX: false,
    showGridY: false,
  },
};

export const LineChartCustomColor: Story = {
  args: {
    ...LineChartExample.args,
    color: '#ec4899', // Pink
    title: 'Monthly Revenue (Custom Color)',
  },
};

export const LineChartSmall: Story = {
  args: {
    ...LineChartExample.args,
    size: 'sm',
    title: 'Monthly Revenue (Small)',
  },
};

// Area Chart examples
export const AreaChartExample: Story = {
  args: {
    type: 'area',
    data: areaData,
    xKey: 'date',
    yKey: 'users',
    title: 'User Growth',
    color: '#b41010',
      },
};

export const AreaChartMultiSeries: Story = {
  args: {
    type: 'area',
    data: multiAreaData,
    xKey: 'date',
    yKey: 'desktop', // This will be ignored for multi-series
    title: 'Device Usage by Platform',
    multiColor: true,
  },
};

export const AreaChartCustomColor: Story = {
  args: {
    ...AreaChartExample.args,
    color: '#8b5cf6', // Purple
    title: 'User Growth (Custom Color)',
  },
};

// Pie Chart examples
export const PieChartExample: Story = {
  args: {
    type: 'pie',
    data: pieData,
    xKey: 'category',
    yKey: 'sales',
    title: 'Sales by Platform',
  },
};

export const PieChartCustomColor: Story = {
  args: {
    ...PieChartExample.args,
    color: '#f59e0b', // Amber
    title: 'Sales by Platform (Custom Color)',
  },
};

// Radar Chart examples
export const RadarChartExample: Story = {
  args: {
    type: 'radar',
    data: radarData,
    xKey: 'subject',
    yKey: 'score',
    title: 'Student Performance',
  },
};

export const RadarChartCustomColor: Story = {
  args: {
    ...RadarChartExample.args,
    color: '#06b6d4', // Cyan
    title: 'Student Performance (Custom Color)',
  },
};

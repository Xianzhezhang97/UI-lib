import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chart } from './Chart';

// Mock the ResponsiveContainer from recharts as it doesn't play well with testing
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe('Chart Component', () => {
  const sampleData = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 200 },
  ];

  test('renders a bar chart correctly', () => {
    render(
      <Chart 
        type="bar" 
        data={sampleData} 
        xKey="name" 
        yKey="value" 
        title="Test Bar Chart" 
      />
    );
    
    expect(screen.getByText('Test Bar Chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('renders a line chart correctly', () => {
    render(
      <Chart 
        type="line" 
        data={sampleData} 
        xKey="name" 
        yKey="value" 
      />
    );

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('applies custom className properly', () => {
    render(
      <Chart 
        type="bar" 
        data={sampleData} 
        xKey="name" 
        yKey="value" 
        className="test-custom-class" 
      />
    );

    const chartWrapper = screen.getByTestId('responsive-container').parentElement?.parentElement;
    expect(chartWrapper).toHaveClass('test-custom-class');
  });

  test('applies different sizes correctly', () => {
    render(
      <Chart 
        type="bar" 
        data={sampleData} 
        xKey="name" 
        yKey="value" 
        size="lg" 
      />
    );

    const chartContainer = screen.getByTestId('responsive-container').parentElement;
    expect(chartContainer).toHaveClass('h-96');
  });

  test('properly displays the title when provided', () => {
    const title = 'Custom Chart Title';
    render(
      <Chart 
        type="bar" 
        data={sampleData} 
        xKey="name" 
        yKey="value" 
        title={title} 
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});

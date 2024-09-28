import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';
import Spinner from './Spinner';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const formatValue = (value) => (value != null ? value.toFixed(2) : 'N/A');
    return (
      <div className="custom-tooltip bg-gray-800 text-white p-2 border rounded shadow">
        <p className="font-bold">{label}</p>
        <p>Budget: €{formatValue(data.Budget)}</p>
        <p>Estimated Costs: €{formatValue(data['Estimated Costs'])}</p>
        <p>Actual Costs: €{formatValue(data['Actual Costs'])}</p>
        <p>Remaining: €{formatValue(data.Remaining)}</p>
        <p>
          Percentage Spent:{' '}
          {data.Budget && data['Actual Costs']
            ? ((data['Actual Costs'] / data.Budget) * 100).toFixed(2)
            : 'N/A'}
          %
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ x, y, width, height, value }) => {
  if (value == null || value <= 0) return null;
  return (
    <g>
      <text
        x={x + width - 5}
        y={y + height / 2}
        fill="#fff"
        textAnchor="end"
        dominantBaseline="middle"
        fontSize="12"
      >
        €{value.toFixed(0)}
      </text>
    </g>
  );
};

const BudgetVsSpentCharts = ({ categoryData }) => {
  const [chart, setChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const processedData = categoryData.map((category) => ({
        name: category.name,
        Budget: category.budget || 0,
        'Estimated Costs': category.estimatedCosts || 0,
        'Actual Costs': category.actualCosts || 0,
        Remaining: Math.max(
          0,
          (category.budget || 0) - (category.actualCosts || 0)
        ),
      }));
      setChart(processedData);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [categoryData]);

  return (
    <div className="border rounded p-4">
      <h2 className="font-bold mb-2 text-lg">Budget vs Costs by Category</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={chart}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Budget" stackId="a" fill="#82ca9d">
              <LabelList dataKey="Budget" content={renderCustomizedLabel} />
            </Bar>
            <Bar dataKey="Estimated Costs" stackId="b" fill="#8884d8">
              <LabelList
                dataKey="Estimated Costs"
                content={renderCustomizedLabel}
              />
            </Bar>
            <Bar dataKey="Actual Costs" stackId="c" fill="#ffc658">
              <LabelList
                dataKey="Actual Costs"
                content={renderCustomizedLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BudgetVsSpentCharts;

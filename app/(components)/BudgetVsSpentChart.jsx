import React from 'react';
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

const BudgetVsSpentCharts = ({ categoryData }) => {
  // Prepare data for the chart
  const chartData = categoryData.map((category) => ({
    name: category.name,
    Budget: category.budget,
    Spent: category.startedCosts,
    Remaining: Math.max(0, category.budget - category.startedCosts),
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-2 border rounded shadow">
          <p className="font-bold">{label}</p>
          <p>Budget: €{data.Budget.toFixed(2)}</p>
          <p>Spent: €{data.Spent.toFixed(2)}</p>
          <p>Remaining: €{data.Remaining.toFixed(2)}</p>
          <p>
            Percentage Spent: {((data.Spent / data.Budget) * 100).toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for the bars
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width - 5}
          y={y + height / 2}
          fill="#fff"
          textAnchor="end"
          dominantBaseline="middle"
        >
          €{value.toFixed(0)}
        </text>
      </g>
    );
  };

  return (
    <div className="border rounded p-4">
      <h2 className="font-bold mb-2 text-lg">Budget vs Spent by Category</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Spent" stackId="a" fill="#8884d8">
            <LabelList content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="Remaining" stackId="a" fill="#82ca9d">
            <LabelList content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetVsSpentCharts;

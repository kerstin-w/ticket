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
    return (
      <div className="custom-tooltip bg-gray-800 text-white p-2 border rounded shadow">
        <p className="font-bold">{label}</p>
        <p>Budget: €{data.Budget.toFixed(2)}</p>
        <p>Total Costs: €{data['Total Costs'].toFixed(2)}</p>
        <p>Started Costs: €{data['Started Costs'].toFixed(2)}</p>
        <p>Remaining: €{data.Remaining.toFixed(2)}</p>
        <p>
          Percentage Spent:{' '}
          {((data['Started Costs'] / data.Budget) * 100).toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ x, y, width, height, value }) => {
  if (value <= 0) return null;
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

const processChartData = (categoryData) => {
  const sortedData = [...categoryData].sort((a, b) => {
    if (a.name.length !== b.name.length) return b.name.length - a.name.length;
    return a.name.localeCompare(b.name);
  });

  return sortedData.map((category) => ({
    name: category.name,
    Budget: category.budget,
    'Total Costs': category.costs,
    'Started Costs': category.startedCosts,
    Remaining: Math.max(0, category.budget - category.startedCosts),
  }));
};

const BudgetVsSpentCharts = ({ categoryData }) => {
  const [chart, setChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setChart(processChartData(categoryData));
      setIsLoading(false);
    }, 100); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, [categoryData]);

  return (
    <div className="border rounded p-4">
      <h2 className="font-bold mb-2 text-lg">
        Budget vs Spent by Category (Including Rollups)
      </h2>
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
            <Bar dataKey="Total Costs" stackId="b" fill="#8884d8">
              <LabelList
                dataKey="Total Costs"
                content={renderCustomizedLabel}
              />
            </Bar>
            <Bar dataKey="Started Costs" stackId="c" fill="#ffc658">
              <LabelList
                dataKey="Started Costs"
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

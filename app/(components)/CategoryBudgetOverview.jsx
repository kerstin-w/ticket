import React from 'react';

const CategoryBudgetOverview = ({ categoryData }) => {
  const formatCurrency = (value) => {
    return value != null ? `€${value.toFixed(2)}` : 'N/A';
  };

  const total = categoryData.reduce(
    (acc, category) => {
      acc.budget += category.budget || 0;
      acc.estimatedCosts += category.estimatedCosts || 0;
      acc.actualCosts += category.actualCosts || 0;
      acc.totalCosts += category.totalCosts || 0;
      return acc;
    },
    { budget: 0, estimatedCosts: 0, actualCosts: 0, totalCosts: 0 }
  );

  total.remainingBudget = total.budget - total.totalCosts;

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Category Budget Overview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border p-2">Category</th>
              <th className="border p-2">Budget</th>
              <th className="border p-2">Estimated Costs</th>
              <th className="border p-2">Actual Costs</th>
              <th className="border p-2">Total Costs</th>
              <th className="border p-2">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((category) => (
              <tr key={category.name}>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">
                  {formatCurrency(category.budget)}
                </td>
                <td className="border p-2">
                  {formatCurrency(category.estimatedCosts)}
                </td>
                <td className="border p-2">
                  {formatCurrency(category.actualCosts)}
                </td>
                <td className="border p-2">
                  {formatCurrency(category.totalCosts)}
                </td>
                <td
                  className={`border p-2 ${
                    category.budget - category.totalCosts < 0
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {formatCurrency(category.budget - category.totalCosts)}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="border p-2">Total</td>
              <td className="border p-2">{formatCurrency(total.budget)}</td>
              <td className="border p-2">
                {formatCurrency(total.estimatedCosts)}
              </td>
              <td className="border p-2">
                {formatCurrency(total.actualCosts)}
              </td>
              <td className="border p-2">{formatCurrency(total.totalCosts)}</td>
              <td
                className={`border p-2 ${
                  total.remainingBudget < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {formatCurrency(total.remainingBudget)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryBudgetOverview;

import React from 'react';

const CategoryBudgetOverview = ({ categoryData }) => (
  <div className="mb-4">
    <h2 className="text-xl font-bold mb-2">Category Budget Overview</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border p-2">Category</th>
            <th className="border p-2">Budget</th>
            <th className="border p-2">Spent (Started)</th>
            <th className="border p-2">Remaining</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((category) => (
            <tr key={category.name}>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">€{category.budget.toFixed(2)}</td>
              <td className="border p-2">
                €{category.startedCosts.toFixed(2)}
              </td>
              <td
                className={`border p-2 ${
                  category.remainingBudget < 0
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                €{category.remainingBudget.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CategoryBudgetOverview;

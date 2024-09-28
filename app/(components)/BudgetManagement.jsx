import React, { useState, useEffect } from 'react';
import { categories } from '../(constants)/categories';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budgetType: 'month',
    budget: 0,
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    const response = await fetch('/api/Budget');
    const data = await response.json();
    setBudgets(data.budgets);
  };

  const handleInputChange = (e) => {
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/Budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBudget),
    });
    if (response.ok) {
      fetchBudgets();
      setNewBudget({ category: '', budgetType: 'month', budget: 0 });
    }
  };

  const handleUpdate = async (id, newBudget) => {
    const response = await fetch('/api/Budget', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, budget: newBudget }),
    });
    if (response.ok) {
      fetchBudgets();
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch('/api/Budget', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      fetchBudgets();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Budget Management</h2>

      {/* Form to add new budget */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4">
          <select
            name="category"
            value={newBudget.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <select
            name="budgetType"
            value={newBudget.budgetType}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
          <input
            type="number"
            name="budget"
            value={newBudget.budget}
            onChange={handleInputChange}
            placeholder="Budget"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Budget
          </button>
        </div>
      </form>

      {/* Table of existing budgets */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Category</th>
            <th className="text-left">Type</th>
            <th className="text-left">Budget</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget._id}>
              <td>{budget.category}</td>
              <td>{budget.budgetType}</td>
              <td>
                <input
                  type="number"
                  value={budget.budget}
                  onChange={(e) => handleUpdate(budget._id, e.target.value)}
                  className="border p-1 rounded"
                />
              </td>
              <td>
                <button
                  onClick={() => handleDelete(budget._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetManagement;

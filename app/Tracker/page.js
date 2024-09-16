'use client';
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import BudgetVsSpentCharts from '../(components)/BudgetVsSpentChart';

const Tracker = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newBudget, setNewBudget] = useState({ category: '', budget: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const ticketsResponse = await fetch('/api/Tickets');
      const ticketsData = await ticketsResponse.json();
      setTickets(ticketsData.tickets);
      setFilteredTickets(ticketsData.tickets);

      const budgetsResponse = await fetch('/api/Budget');
      const budgetsData = await budgetsResponse.json();
      const budgetsObject = budgetsData.budgets.reduce((acc, budget) => {
        acc[budget.category] = budget.budget;
        return acc;
      }, {});
      setCategoryBudgets(budgetsObject);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = tickets.filter(
      (ticket) =>
        (categoryFilter === 'All' || ticket.category === categoryFilter) &&
        (statusFilter === 'All' || ticket.status === statusFilter) &&
        (priorityFilter === 'All' ||
          ticket.priority.toString() === priorityFilter) &&
        (typeFilter === 'All' || ticket.type === typeFilter) &&
        (!startDate || new Date(ticket.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(ticket.createdAt) <= new Date(endDate))
    );
    setFilteredTickets(filtered);
  }, [
    categoryFilter,
    statusFilter,
    priorityFilter,
    typeFilter,
    startDate,
    endDate,
    tickets,
  ]);

  const getKPIs = () => {
    const kpis = {
      totalTickets: filteredTickets.length,
      totalHours: filteredTickets.reduce(
        (sum, ticket) => sum + (ticket.hours || 0),
        0
      ),
      totalCosts: filteredTickets.reduce(
        (sum, ticket) => sum + (ticket.costs || 0),
        0
      ),
      averageProgress:
        filteredTickets.length > 0
          ? filteredTickets.reduce(
              (sum, ticket) => sum + (ticket.progress || 0),
              0
            ) / filteredTickets.length
          : 0,
    };

    // Calculate remaining budget
    const categoryTotals = filteredTickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + (ticket.costs || 0);
      return acc;
    }, {});

    const remainingBudgets = Object.keys(categoryBudgets).reduce(
      (acc, category) => {
        acc[category] =
          categoryBudgets[category] - (categoryTotals[category] || 0);
        return acc;
      },
      {}
    );

    kpis.remainingBudgets = remainingBudgets;

    return kpis;
  };

  const getStatusData = () => {
    const statusCount = filteredTickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  };

  const getCategoryData = () => {
    const categoryData = filteredTickets.reduce((acc, ticket) => {
      if (!acc[ticket.category]) {
        acc[ticket.category] = {
          name: ticket.category,
          count: 0,
          costs: 0,
          startedCosts: 0,
          budget: categoryBudgets[ticket.category] || 0,
        };
      }
      acc[ticket.category].count += 1;
      acc[ticket.category].costs += ticket.costs || 0;
      if (ticket.status === 'started') {
        acc[ticket.category].startedCosts += ticket.costs || 0;
      }
      return acc;
    }, {});

    return Object.values(categoryData).map((category) => ({
      ...category,
      remainingBudget: category.budget - category.startedCosts,
    }));
  };

  const kpis = getKPIs();
  const statusData = getStatusData();
  const categoryData = getCategoryData();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleSetBudget = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/Budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBudget),
    });
    const data = await response.json();
    setCategoryBudgets((prev) => ({
      ...prev,
      [data.budget.category]: data.budget.budget,
    }));
    setNewBudget({ category: '', budget: 0 });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Dashboard</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Categories</option>
          {Array.from(new Set(tickets.map((t) => t.category))).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Statuses</option>
          {Array.from(new Set(tickets.map((t) => t.status))).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Priorities</option>
          {Array.from(new Set(tickets.map((t) => t.priority))).map((p) => (
            <option key={p} value={p.toString()}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Types</option>
          {Array.from(new Set(tickets.map((t) => t.type))).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-2"
          placeholder="End Date"
        />
      </div>
      {/* Budget Setting Form */}
      <form onSubmit={handleSetBudget} className="mb-4 flex gap-2">
        <select
          value={newBudget.category}
          onChange={(e) =>
            setNewBudget((prev) => ({ ...prev, category: e.target.value }))
          }
          className="border rounded p-2 flex-grow"
          required
        >
          <option value="">Select Category</option>
          {Array.from(new Set(tickets.map((t) => t.category))).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={newBudget.budget}
          onChange={(e) =>
            setNewBudget((prev) => ({
              ...prev,
              budget: parseFloat(e.target.value),
            }))
          }
          className="border rounded p-2 w-32"
          placeholder="Budget"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Set Budget
        </button>
      </form>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border rounded p-4 bg-blue-100">
          <h2 className="font-bold text-lg text-blue-600">Total Tickets</h2>
          <p className="text-3xl font-bold text-blue-600">
            {kpis.totalTickets}
          </p>
        </div>
        <div className="border rounded p-4 bg-green-100">
          <h2 className="font-bold text-lg text-green-600">Total Hours</h2>
          <p className="text-3xl font-bold text-green-600">
            {kpis.totalHours.toFixed(2)}
          </p>
        </div>
        <div className="border rounded p-4 bg-yellow-100">
          <h2 className="font-bold text-lg text-yellow-600">Total Costs</h2>
          <p className="text-3xl font-bold text-yellow-600">
            €{kpis.totalCosts.toFixed(2)}
          </p>
        </div>
        <div className="border rounded p-4 bg-purple-100">
          <h2 className="font-bold text-lg text-purple-600">
            Average Progress
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {kpis.averageProgress.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Category Budget Overview */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* New Budget vs Spent Charts */}
        <BudgetVsSpentCharts categoryData={categoryData} />
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2 text-lg">Tickets by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2 text-lg">Tickets by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Tracker;

'use client';
import React, { useMemo, useState } from 'react';
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
import { useTicketData } from '../hooks/useTicketData';
import { useFilteredTickets } from '../hooks/useFilteredTickets';
import { categories as predefinedCategories } from '../(constants)/categories';
import KPI from '../(components)/KPI';
import CategoryCheckboxFilter from '../(components)/CategoryCheckboxFilter';

const Tracker = () => {
  const { tickets, categoryBudgets } = useTicketData();
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const allCategories = useMemo(() => {
    const ticketCategories = Array.from(
      new Set(tickets.map((t) => t.category))
    );
    return [
      ...new Set([
        ...predefinedCategories.map((c) => c.value),
        ...ticketCategories,
      ]),
    ];
  }, [tickets]);

  const { filteredTickets, categoryData } = useFilteredTickets(
    tickets,
    categoryBudgets,
    selectedCategories,
    statusFilter,
    priorityFilter,
    typeFilter
  );

  const handleCategoryChange = (newSelectedCategories) => {
    setSelectedCategories(newSelectedCategories);
  };

  const resetFilters = () => {
    setSelectedCategories(['All']);
    setStatusFilter('All');
    setPriorityFilter('All');
    setTypeFilter('All');
  };

  const kpis = useMemo(() => {
    const totalTickets = filteredTickets.length;
    const totalHours = filteredTickets.reduce(
      (sum, ticket) => sum + (ticket.hours || 0),
      0
    );
    const totalCosts = filteredTickets.reduce(
      (sum, ticket) => sum + (ticket.costs || 0),
      0
    );
    const averageProgress =
      totalTickets > 0
        ? filteredTickets.reduce(
            (sum, ticket) => sum + (ticket.progress || 0),
            0
          ) / totalTickets
        : 0;

    return { totalTickets, totalHours, totalCosts, averageProgress };
  }, [filteredTickets]);

  const statusData = useMemo(() => {
    const statusCount = filteredTickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  }, [filteredTickets]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Dashboard</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <CategoryCheckboxFilter
          categories={allCategories}
          selectedCategories={selectedCategories}
          onChange={handleCategoryChange}
        />
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
        <button
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Filters
        </button>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <KPI
          title="Total Tickets"
          value={kpis.totalTickets}
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <KPI
          title="Total Hours"
          value={kpis.totalHours.toFixed(2)}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <KPI
          title="Total Costs"
          value={`€${kpis.totalCosts.toFixed(2)}`}
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
        />
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

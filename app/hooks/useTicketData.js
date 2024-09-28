import { useState, useEffect } from 'react';

export const useTicketData = () => {
  const [tickets, setTickets] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const ticketsResponse = await fetch('/api/Tickets');
      const ticketsData = await ticketsResponse.json();
      setTickets(ticketsData.tickets);

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

  return { tickets, categoryBudgets };
};

import { useMemo } from 'react';
import { getCategoryRelations } from '../utils/categoryMapping';
import { categories as predefinedCategories } from '../(constants)/categories';

export const useFilteredTickets = (
  tickets,
  categoryBudgets,
  selectedCategories,
  statusFilter,
  priorityFilter,
  typeFilter
) => {
  const filteredTickets = useMemo(() => {
    return tickets.filter(
      (ticket) =>
        (selectedCategories.includes('All') ||
          selectedCategories.includes(ticket.category)) &&
        (statusFilter === 'All' || ticket.status === statusFilter) &&
        (priorityFilter === 'All' ||
          ticket.priority.toString() === priorityFilter) &&
        (typeFilter === 'All' || ticket.type === typeFilter)
    );
  }, [tickets, selectedCategories, statusFilter, priorityFilter, typeFilter]);

  const categoryData = useMemo(() => {
    const data = {};
    const relations = getCategoryRelations(predefinedCategories);

    // Initialize data for all selected categories
    const categoriesToInclude = selectedCategories.includes('All')
      ? predefinedCategories.map((c) => c.value)
      : selectedCategories;

    categoriesToInclude.forEach((category) => {
      if (category !== 'All') {
        data[category] = {
          name: category,
          count: 0,
          costs: 0,
          startedCosts: 0,
          budget: categoryBudgets[category] || 0,
        };
      }
    });

    // Populate data from filtered tickets
    filteredTickets.forEach((ticket) => {
      const addCosts = (category, costs, isStarted) => {
        if (!data[category]) {
          data[category] = {
            name: category,
            count: 0,
            costs: 0,
            startedCosts: 0,
            budget: categoryBudgets[category] || 0,
          };
        }
        data[category].count += 1;
        data[category].costs += costs;
        if (isStarted) {
          data[category].startedCosts += costs;
        }
      };

      const costs = ticket.costs || 0;
      const isStarted = ticket.status === 'started';

      addCosts(ticket.category, costs, isStarted);

      if (relations[ticket.category]) {
        relations[ticket.category].forEach((relatedCategory) => {
          addCosts(relatedCategory, costs, isStarted);
        });
      }
    });

    return Object.values(data).map((category) => ({
      ...category,
      remainingBudget: category.budget - category.startedCosts,
    }));
  }, [filteredTickets, categoryBudgets, selectedCategories]);

  return { filteredTickets, categoryData };
};

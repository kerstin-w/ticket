export const organizeCategories = (categories) => {
  const yearCategories = {};

  categories.forEach((category) => {
    const year = getYearFromCategory(category.value);
    if (year) {
      if (!yearCategories[year]) {
        yearCategories[year] = [];
      }
      yearCategories[year].push(category);
    }
  });

  return yearCategories;
};

export const getYearFromCategory = (category) => {
  const match = category.match(/(\d{4})$/);
  return match ? match[1] : null;
};

export const getAvailableYears = (categories) => {
  const years = new Set();
  categories.forEach((category) => {
    const year = getYearFromCategory(category.value);
    if (year) {
      years.add(year);
    }
  });
  return Array.from(years).sort();
};

export const getCategoryLevels = (category) => {
  const year = category.slice(-4);
  const month = category.slice(0, 2);
  const quarter = `Q${Math.ceil(parseInt(month) / 3)}${year}`;

  return {
    categoryMonth: category,
    categoryQuarter: quarter,
    categoryYear: year,
  };
};

export const getParentCategories = (category) => {
  const { categoryMonth, categoryQuarter, categoryYear } =
    getCategoryLevels(category);
  const parents = [categoryMonth];

  if (categoryQuarter !== categoryMonth) {
    parents.push(categoryQuarter);
  }

  if (categoryYear !== categoryQuarter && categoryYear !== categoryMonth) {
    parents.push(categoryYear);
  }

  return parents;
};

export const calculateRemainingBudget = async (
  category,
  Ticket,
  CategoryBudget
) => {
  const parentCategories = getParentCategories(category);
  let totalBudget = 0;
  let totalSpent = 0;

  // Calculate total budget
  for (const cat of parentCategories) {
    const budgetDoc = await CategoryBudget.findOne({ category: cat });
    if (budgetDoc) {
      totalBudget += budgetDoc.budget;
    }
  }

  // Calculate total spent
  const tickets = await Ticket.find({
    $or: [
      { categoryMonth: { $in: parentCategories } },
      { categoryQuarter: { $in: parentCategories } },
      { categoryYear: { $in: parentCategories } },
    ],
    status: 'started',
  });

  totalSpent = tickets.reduce((sum, ticket) => sum + (ticket.costs || 0), 0);

  return totalBudget - totalSpent;
};

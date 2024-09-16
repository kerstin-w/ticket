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

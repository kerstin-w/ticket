export const getCategoryRelations = (categories) => {
  const relations = {};

  categories.forEach(({ value }) => {
    if (value.length === 6 && value.startsWith('Q')) {
      // Quarter category
      const year = value.slice(2);
      relations[value] = [year];
    } else if (value.length === 6) {
      // Month category
      const month = value.slice(0, 2);
      const year = value.slice(2);
      const quarter = `Q${Math.ceil(parseInt(month) / 3)}${year}`;
      relations[value] = [quarter, year];
    }
  });

  return relations;
};

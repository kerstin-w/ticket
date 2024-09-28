import { useState, useEffect } from 'react';
import { categories as predefinedCategories } from '../(constants)/categories';

export const useCategories = (tickets) => {
  const [categories, setCategories] = useState(
    predefinedCategories.map((c) => c.value)
  );

  useEffect(() => {
    const dynamicCategories = [
      ...new Set(tickets.map(({ category }) => category)),
    ];
    const allCategories = [
      ...new Set([
        ...predefinedCategories.map((c) => c.value),
        ...dynamicCategories,
      ]),
    ];
    setCategories(allCategories);
  }, [tickets]);

  return { categories };
};

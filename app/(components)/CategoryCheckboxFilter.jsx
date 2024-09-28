import React, { useState, useRef, useEffect } from 'react';
import { categories as predefinedCategories } from '../(constants)/categories';

const CategoryCheckboxFilter = ({
  categories,
  selectedCategories,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategoryChange = (category) => {
    let newSelectedCategories;
    if (category === 'All') {
      newSelectedCategories = selectedCategories.includes('All') ? [] : ['All'];
    } else {
      if (selectedCategories.includes('All')) {
        newSelectedCategories = [category];
      } else {
        newSelectedCategories = selectedCategories.includes(category)
          ? selectedCategories.filter((c) => c !== category)
          : [...selectedCategories, category];
      }
    }
    onChange(
      newSelectedCategories.length === 0 ? ['All'] : newSelectedCategories
    );
  };

  const isAllSelected = selectedCategories.includes('All');
  const displayText = isAllSelected
    ? 'All Categories'
    : selectedCategories.length === 0
    ? 'Select Categories'
    : `${selectedCategories.length} selected`;

  const getCategoryLabel = (category) => {
    const predefinedCategory = predefinedCategories.find(
      (c) => c.value === category
    );
    return predefinedCategory ? predefinedCategory.label : category;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border rounded flex bg-card justify-between items-center"
      >
        <span>{displayText}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border rounded bg-card shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            <label className="flex items-center p-2 hover:bg-gray-800">
              <input
                type="checkbox"
                value="All"
                checked={isAllSelected}
                onChange={() => handleCategoryChange('All')}
                className="mr-2"
              />
              All Categories
            </label>
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center p-2 hover:bg-gray-800"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {getCategoryLabel(category)}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default CategoryCheckboxFilter;

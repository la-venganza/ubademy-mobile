import React, { useState } from 'react';
import DropDown from 'react-native-paper-dropdown';
import categories from '../../data/categories.json';

const CategoryDropdown = ({ handleChange }) => {
  const [categoryDropdownIsOpen, setCategoryDropdownIsOpen] = useState(false);
  const [category, _setCategory] = useState('');

  const setCategory = (value) => {
    handleChange(value);
    _setCategory(value);
  };
  return (
    <DropDown
      label="Category"
      mode="outlined"
      visible={categoryDropdownIsOpen}
      showDropDown={() => setCategoryDropdownIsOpen(true)}
      onDismiss={() => setCategoryDropdownIsOpen(false)}
      value={category}
      setValue={setCategory}
      list={categories}
    />
  );
};

export default CategoryDropdown;

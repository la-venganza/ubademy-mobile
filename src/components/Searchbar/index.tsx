import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBarComponent = ({ searchTerm, setSearchTerm }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);
  const handleInput = (value: string) => {
    setInternalSearchTerm(value);
    if (value.length > 2) {
      setSearchTerm(value);
    } else {
      setSearchTerm('');
    }
  };
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={handleInput}
      value={internalSearchTerm}
    />
  );
};

export default SearchBarComponent;

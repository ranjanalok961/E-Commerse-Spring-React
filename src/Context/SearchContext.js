import React, { createContext, useState, useContext } from 'react';

// Create a Context
const SearchContext = createContext();

// Create a Provider Component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [category, setCategory] = useState('All');

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        category,
        setCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};

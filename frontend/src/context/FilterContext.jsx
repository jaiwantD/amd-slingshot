import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("AI Accelerators");
  const [searchQuery, setSearchQuery] = useState("");
  const [compatibility, setCompatibility] = useState({
      neuralOS: false,
      quantumBridge: false
  });

  const toggleCompatibility = (key) => {
      setCompatibility(prev => ({
          ...prev,
          [key]: !prev[key]
      }));
  };

  const clearFilters = () => {
      setActiveCategory(null);
      setSearchQuery("");
      setCompatibility({ neuralOS: false, quantumBridge: false });
  };

  return (
    <FilterContext.Provider value={{ 
        activeCategory, setActiveCategory, 
        searchQuery, setSearchQuery, 
        compatibility, toggleCompatibility,
        clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

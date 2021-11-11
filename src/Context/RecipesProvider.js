import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [data, setData] = useState([]);
  const [initialFoods, setInitialFoods] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);

  const contextValue = {
    searchValue,
    setSearchValue,
    radioValue,
    setRadioValue,
    data,
    setData,
    isSearchBar,
    setIsSearchBar,
    initialDrinks,
    setInitialDrinks,
    initialFoods,
    setInitialFoods,
  };
  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;

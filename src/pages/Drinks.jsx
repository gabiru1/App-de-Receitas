import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../Context/RecipesContext';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName } from '../services/FetchApi';

function Drinks() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue } = useContext(RecipesContext);

  function handleClick() {
    switch (radioValue) {
    case 'ingrediente':
      fetchApiByIngredient(searchValue);
      setSearchValue('');
      break;
    case 'nome':
      fetchApiByName(searchValue);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      fetchApiByFirstLetter(searchValue);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      <Header title="Bebidas" showSearchBtn handleClick={ handleClick } />
    </div>
  );
}

export default Drinks;

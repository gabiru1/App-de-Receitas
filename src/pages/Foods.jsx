import React, { useContext } from 'react';
import Header from '../components/Header';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName } from '../services/FetchApi';
import RecipesContext from '../Context/RecipesContext';

function Foods() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue } = useContext(RecipesContext);

  function handleClick() {
    switch (radioValue) {
    case 'ingrediente':
      fetchApiByIngredient(searchValue, true);
      setSearchValue('');
      break;
    case 'nome':
      fetchApiByName(searchValue, true);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      fetchApiByFirstLetter(searchValue, true);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      <Header title="Comidas" showSearchBtn handleClick={ handleClick } />
    </div>
  );
}

export default Foods;

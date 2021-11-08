import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import RecipesContext from '../Context/RecipesContext';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName } from '../services/FetchApi';

function Drinks() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue, data, setData } = useContext(RecipesContext);
  let results = [];

  async function handleClick() {
    switch (radioValue) {
    case 'ingrediente':
      results = await fetchApiByIngredient(searchValue);
      setData(results.drinks);
      setSearchValue('');
      break;
    case 'nome':
      results = await fetchApiByName(searchValue);
      setData(results.drinks);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      results = await fetchApiByFirstLetter(searchValue);
      setData(results.drinks);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      {(data.length === 1) && <Redirect to={ `/bebidas/${data[0].idDrink}` } />}
      <Header title="Bebidas" showSearchBtn handleClick={ handleClick } />
    </div>
  );
}

export default Drinks;

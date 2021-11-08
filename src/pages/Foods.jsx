import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName } from '../services/FetchApi';
import RecipesContext from '../Context/RecipesContext';

function Foods() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue, data, setData } = useContext(RecipesContext);
  let results = [];

  async function handleClick() {
    switch (radioValue) {
    case 'ingrediente':
      results = await fetchApiByIngredient(searchValue, true);
      setData(results.meals);
      setSearchValue('');
      break;
    case 'nome':
      results = await fetchApiByName(searchValue, true);
      setData(results.meals);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      results = await fetchApiByFirstLetter(searchValue, true);
      setData(results.meals);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      {data.length === 1 && <Redirect to={ `/comidas/${data[0].idMeal}` } />}
      <Header title="Comidas" showSearchBtn handleClick={ handleClick } />
    </div>
  );
}

export default Foods;

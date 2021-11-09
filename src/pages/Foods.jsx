import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Card from '../components/Card';
import CategoryButtons from '../components/CategoryButtons';
import Header from '../components/Header';
import RecipesContext from '../Context/RecipesContext';
import {
  fetchApi, fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName,
} from '../services/FetchApi';

function Foods() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue, data,
    setData, isSearchBar, setIsSearchBar } = useContext(RecipesContext);
  const maxResults = 12;
  const MESSAGE = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let results = [];

  async function setInitialData() {
    const resultApi = await fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?i', true);
    setData(resultApi);
  }
  useEffect(() => {
    setInitialData();
  }, []);

  function sendAlert(apiResult) {
    if (!apiResult.meals) {
      global.alert(MESSAGE);
    }
  }

  async function handleClick() {
    setIsSearchBar(true);
    switch (radioValue) {
    case 'ingrediente':
      results = await fetchApiByIngredient(searchValue, true);
      sendAlert(results);
      setData(results.meals || []);
      setSearchValue('');
      break;
    case 'nome':
      results = await fetchApiByName(searchValue, true);
      sendAlert(results);
      setData(results.meals || []);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      results = await fetchApiByFirstLetter(searchValue, true);
      sendAlert(results);
      setData(results.meals || []);
      setSearchValue('');
      break;
    default:
      break;
    }
  }

  return (
    <div>
      <Header title="Comidas" showSearchBtn handleClick={ handleClick } />
      <CategoryButtons />
      <div className="card-container">
        {(data.length === 1 && isSearchBar)
          ? (<Redirect to={ `/comidas/${data[0].idMeal}` } />) : (
            data.slice(0, maxResults).map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Card
                key={ idMeal }
                src={ strMealThumb }
                name={ strMeal }
                dataTesteID={ index }
              />
            )))}
      </div>
    </div>
  );
}

export default Foods;

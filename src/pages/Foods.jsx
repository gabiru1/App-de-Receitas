import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName } from '../services/FetchApi';
import RecipesContext from '../Context/RecipesContext';

function Foods() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue, data, setData } = useContext(RecipesContext);
  const maxResults = 12;
  const MESSAGE = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let results = [];

  async function handleClick() {
    switch (radioValue) {
    case 'ingrediente':
      results = await fetchApiByIngredient(searchValue, true);
      if (!results.meals) {
        global.alert(MESSAGE);
        break;
      }
      setData(results.meals);
      setSearchValue('');
      break;
    case 'nome':
      results = await fetchApiByName(searchValue, true);
      if (!results.meals) {
        global.alert(MESSAGE);
        break;
      }
      setData(results.meals);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      results = await fetchApiByFirstLetter(searchValue, true);
      if (!results.meals) {
        global.alert(MESSAGE);
        break;
      }
      setData(results.meals);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      <Header title="Comidas" showSearchBtn handleClick={ handleClick } />
      <div className="card-container">
        {(data.length === 1) ? (<Redirect to={ `/comidas/${data[0].idMeal}` } />) : (
          data.slice(0, maxResults).map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <h3
                data-testid={ `${index}-card-name` }
                className="card-title"
              >
                { strMeal }
              </h3>
            </div>
          )))}
      </div>
    </div>
  );
}

export default Foods;

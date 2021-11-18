import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../Context/RecipesContext';
import Card from '../components/Card';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName, fetchApi } from '../services/FetchApi';
import CategoryButtons from '../components/CategoryButtons';

function Drinks() {
  const { setInitialDrinks, searchValue, setSearchValue, isSearchBar,
    setIsSearchBar, data, setData, renderData, radioValue } = useContext(RecipesContext);
  const maxResults = 12;
  const MESSAGE = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let results = [];

  async function setInitialData() {
    const resultApi = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', false);
    setData(resultApi);
    setInitialDrinks(resultApi);
  }
  useEffect(() => {
    if (renderData) {
      setInitialData();
    }
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
      results = await fetchApiByIngredient(searchValue);
      sendAlert(results);
      setData(results.drinks || []);
      setSearchValue('');
      break;
    case 'nome':
      results = await fetchApiByName(searchValue);
      sendAlert(results);
      setData(results.drinks || []);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      results = await fetchApiByFirstLetter(searchValue);
      sendAlert(results);
      setData(results.drinks || []);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      <Header title="Bebidas" showSearchBtn handleClick={ handleClick } />
      <CategoryButtons />
      <div className="card-container">
        {(data.length === 1 && isSearchBar)
          ? (<Redirect to={ `/bebidas/${data[0].idDrink}` } />) : (
            data.slice(0, maxResults)
              .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
                <Card
                  key={ idDrink }
                  src={ strDrinkThumb }
                  name={ strDrink }
                  dataTesteID={ index }
                  id={ idDrink }
                  path="bebidas"
                />
              )))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;

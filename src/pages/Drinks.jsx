import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../Context/RecipesContext';
import { fetchApiByFirstLetter,
  fetchApiByIngredient, fetchApiByName } from '../services/FetchApi';

function Drinks() {
  const { radioValue } = useContext(RecipesContext);
  const { searchValue, setSearchValue, data, setData } = useContext(RecipesContext);
  const maxResults = 12;
  const MESSAGE = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  let results = [];

  async function handleClick() {
    switch (radioValue) {
    case 'ingrediente':
      results = await fetchApiByIngredient(searchValue);
      if (!results.drinks) {
        global.alert(MESSAGE);
        break;
      }
      setData(results.drinks);
      setSearchValue('');
      break;
    case 'nome':
      results = await fetchApiByName(searchValue);
      if (!results.drinks) {
        global.alert(MESSAGE);
        break;
      }
      setData(results.drinks);
      setSearchValue('');
      break;
    case 'primeira-letra':
      if (searchValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      results = await fetchApiByFirstLetter(searchValue);
      if (!results.drinks) {
        global.alert(MESSAGE);
        break;
      }
      setData(results.drinks);
      setSearchValue('');
      break;
    default:
      break;
    }
  }
  return (
    <div>
      <Header title="Bebidas" showSearchBtn handleClick={ handleClick } />
      <div className="card-container">
        {(data.length === 1) ? (<Redirect to={ `/bebidas/${data[0].idDrink}` } />) : (
          data.slice(0, maxResults).map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <h3
                data-testid={ `${index}-card-name` }
                className="card-title"
              >
                { strDrink }
              </h3>
            </div>
          )))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;

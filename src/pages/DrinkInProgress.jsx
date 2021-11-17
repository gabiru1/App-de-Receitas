import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './FoodInProgress.css';
import getIngredients from '../helper/helper';
import { fetchApiByID } from '../services/FetchApi';

function DrinkInProgress({ history }) {
  const [fullIngredient, setFullIngredient] = useState([]);
  const [checked, setChecked] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [getLocal, setLocal] = useState([]);
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  function getFullIngredients(response) {
    const ingredients = getIngredients(response, 'strIngredient');
    const amountIngredients = getIngredients(response, 'strMeasure');
    const fullIngredientsArray = [];
    ingredients.forEach((element, index) => {
      let ingredientAndAmount = '';
      if (element) {
        console.log(element);
        ingredientAndAmount += element;
      }
      if (amountIngredients[index]) {
        ingredientAndAmount += ` - ${amountIngredients[index]}`;
      }
      fullIngredientsArray.push(ingredientAndAmount);
    });
    setFullIngredient(fullIngredientsArray.filter((element) => element !== ''));
  }

  function countChecked(target) {
    return target.checked ? setChecked(checked + 1) : setChecked(checked - 1);
  }

  function setClassNameChecked(target) {
    return target.parentElement.classList.toggle('checked');
  }

  function sendLocalStorage() {
    const exist = localStorage.getItem('inProgressRecipes');
    console.log(exist);
    if (exist) {
      const json = JSON.parse(exist);
      const value = (Object.values(json.drinks));
      setLocal(value[0]);
    }
  }

  function handleClick({ target }) {
    countChecked(target);
    setClassNameChecked(target);
    setIngredientsList([...ingredientsList, target.name]);
    const id = recipe.idDrink;
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks:
      { [id]: [...ingredientsList, target.name] } }));
  }

  async function fetchApi() {
    const response = await fetchApiByID(recipeId, false);
    getFullIngredients(response);
    setRecipe(response[0]);
  }

  useEffect(() => {
    fetchApi();
    sendLocalStorage();
  }, []);

  function getDate() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    return dataAtual;
  }

  function handleFinish() {
    const exist = localStorage.getItem('doneRecipes');
    let tags = [];
    if (!recipe.strTags === ('' || null)) {
      tags = recipe.strTags;
    }
    const doneRecipe = {
      id: recipeId,
      type: 'bebida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: getDate(),
      tags,
    };
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('doneRecipes', JSON.stringify([...json, doneRecipe]));
      console.log(json, 'aqui papai');
    } else localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    history.push('/receitas-feitas');
  }
  return (
    <div>
      <img
        alt={ recipe.strDrink }
        src={ recipe.strDrinkThumb }
        width="200px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {recipe.strDrink}
      </h1>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      <ol>
        { (fullIngredient.map((element, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              defaultChecked={ getLocal.some((jose) => element === jose) }
              type="checkbox"
              name={ element }
              id={ index }
              onChange={ (event) => handleClick(event) }
            />
            {' '}
            {element}
          </li>)))}
      </ol>
      <div data-testid="instructions">
        {recipe.strInstructions }
      </div>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinish }
        disabled={ checked !== fullIngredient.length }
      >
        finalizar
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkInProgress;

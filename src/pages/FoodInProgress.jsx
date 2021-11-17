import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchApiByID } from '../services/FetchApi';
import './FoodInProgress.css';

function FoodInProgress({ history }) {
  const [fullIngredient, setFullIngredient] = useState([]);
  const [checked, setChecked] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [getLocal, setLocal] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [valuesObj, setValuesObj] = useState([]);
  const [keysObj, setKeysObj] = useState([]);
  const { recipeId } = useParams();

  function getIngredients() {
    const ingredientsArray = [];
    keysObj.forEach((element, index) => element.includes('strIngredient')
      && ingredientsArray.push(valuesObj[index]));
    console.log(ingredientsArray, 'oi');
    return ingredientsArray;
  }

  function getAmountIngredients() {
    const amountIngredientsArray = [];
    keysObj.forEach((element, index) => element.includes('strMeasure')
    && amountIngredientsArray.push(valuesObj[index]));
    return amountIngredientsArray;
  }

  function getFullIngredients() {
    const ingredients = getIngredients();
    const amountIngredients = getAmountIngredients();
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
      const value = (Object.values(json.meals));
      setLocal(value[0]);
    }
  }

  function handleClick({ target }) {
    countChecked(target);
    setClassNameChecked(target);
    setIngredientsList([...ingredientsList, target.name]);
    const id = recipe.idMeal;
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals:
      { [id]: [...ingredientsList, target.name] } }));
  }

  async function fetchApi() {
    const response = await fetchApiByID(recipeId, true);
    setValuesObj(Object.values(response[0]));
    setKeysObj(Object.keys(response[0]));
    setRecipe(response[0]);
  }

  useEffect(() => {
    fetchApi();
    sendLocalStorage();
  }, []);

  useEffect(() => {
    getFullIngredients();
  }, [keysObj]);

  /* [{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
}] */

  function handleFinish() {
    history.push('/receitas-feitas');
  }

  return (
    <div>
      <img
        alt={ recipe.strMeal }
        src={ recipe.strMealThumb }
        width="200px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {recipe.strMeal}
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

FoodInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FoodInProgress;

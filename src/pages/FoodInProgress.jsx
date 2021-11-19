import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchApiByID } from '../services/FetchApi';
import './FoodInProgress.css';
import getIngredients from '../helper/helper';

function FoodInProgress({ history }) {
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
    return fullIngredientsArray;
  }

  function countChecked(target) {
    return target.checked ? setChecked(checked + 1) : setChecked(checked - 1);
  }

  function setClassNameChecked(target) {
    return target.parentElement.classList.toggle('checked');
  }

  function sendLocalStorage() {
    const exist = localStorage.getItem('inProgressRecipes');
    if (exist) {
      const json = JSON.parse(exist);
      console.log(json.meals[recipeId], 'JSON LOCAL STORAGE');
      const value = (Object.values(json.meals[recipeId] || []));
      console.log(value);
      setLocal(value || []);
    }
  }

  function handleClick({ target }) {
    countChecked(target);
    setClassNameChecked(target);
    setIngredientsList([...ingredientsList, target.name]);
    const id = recipe.idMeal;
    const exist = localStorage.getItem('inProgressRecipes');
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...json,
        meals: { ...json.meals, [id]: [...ingredientsList, target.name] } }));
      return;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {},
      meals:
      { [id]: [...ingredientsList, target.name] } }));
  }

  async function fetchApi() {
    const response = await fetchApiByID(recipeId, true);
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
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: getDate(),
      tags,
    };
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('doneRecipe', JSON.stringify([...json, doneRecipe]));
    } else localStorage.setItem('doneRecipe', JSON.stringify([doneRecipe]));
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
              defaultChecked={ getLocal
                .some((currentRecipe) => element === currentRecipe) }
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

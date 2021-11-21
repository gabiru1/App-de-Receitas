import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchApiByID } from '../services/FetchApi';
import './FoodInProgress.css';
import getIngredients from '../helper/helper';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import saveFoodRecipeLocalStorage from '../helper/saveFoodRecipeLocalStorage';
import setFoodFavoriteInLocalStorage from '../helper/setFoodFavoriteInLocalStorage';

function FoodInProgress({ history }) {
  const [fullIngredient, setFullIngredient] = useState([]);
  const [count, setCount] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [getLocal, setLocal] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [toggleHeart, setToggleHeart] = useState(true);
  const { recipeId } = useParams();

  function getFullIngredients(response) {
    const ingredients = getIngredients(response, 'strIngredient');
    const amountIngredients = getIngredients(response, 'strMeasure');
    const fullIngredientsArray = [];
    ingredients.forEach((element, index) => {
      let ingredientAndAmount = '';
      if (element) {
        ingredientAndAmount += element;
      }
      if (amountIngredients[index]) {
        ingredientAndAmount += ` - ${amountIngredients[index]}`;
      }
      fullIngredientsArray.push(ingredientAndAmount);
    });
    setFullIngredient(fullIngredientsArray
      .filter((element) => element !== ''));
    return fullIngredientsArray;
  }

  function countChecked(target) {
    return target.checked ? setCount(count + 1) : setCount(count - 1);
  }

  function setClassNameChecked(target) {
    return target.parentElement.classList.toggle('checked');
  }

  function sendLocalStorage() {
    const exist = localStorage.getItem('inProgressRecipes');
    if (exist) {
      const json = JSON.parse(exist);
      const value = (Object.values(json.meals[recipeId] || []));
      setLocal(value || []);
      setCount(value.length);
    }
  }

  function setRecipeLocalStorage(target) {
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

  function handleClick({ target }) {
    countChecked(target);
    setClassNameChecked(target);
    setRecipeLocalStorage(target);
    const id = recipe.idMeal;
    if (target.checked) {
      setRecipeLocalStorage(target);
      return;
    }
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const value = Object.values(getLocalStorage.meals[recipeId])
      .filter((element) => element !== target.name);
    setIngredientsList(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...getLocalStorage,
      meals: { ...getLocalStorage.meals, [id]: value } }));
  }

  async function fetchApi() {
    const response = await fetchApiByID(recipeId, true);
    getFullIngredients(response);
    setRecipe(response[0]);
  }

  useEffect(() => {
    fetchApi();
    sendLocalStorage();
    const getRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const exist = getRecipe.find((element) => element.id === recipeId);
    if (exist) {
      setHeart(blackHeartIcon);
      setToggleHeart(!toggleHeart);
    }
  }, []);

  function handleFinish() {
    saveFoodRecipeLocalStorage(recipe, recipeId, history);
  }

  function handleFavorite() {
    setToggleHeart(!toggleHeart);
    if (toggleHeart) {
      setHeart(blackHeartIcon);
      setFoodFavoriteInLocalStorage(recipe, recipeId);
    } else {
      setHeart(whiteHeartIcon);
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filtered = getLocalStorage.filter((element) => element.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
  }

  return (
    <div className="main-div">
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
          <li
            key={ index }
            className={ getLocal
              .some((currentRecipe) => element === currentRecipe) && 'checked' }
            data-testid={ `${index}-ingredient-step` }
          >
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
      <button type="button" onClick={ handleFavorite }>
        <img data-testid="favorite-btn" src={ heart } alt="favoritar" />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinish }
        disabled={ count !== fullIngredient.length }
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

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './FoodInProgress.css';
import getIngredients from '../helper/helper';
import { fetchApiByID } from '../services/FetchApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkInProgress({ history }) {
  const [fullIngredient, setFullIngredient] = useState([]);
  const [count, setCount] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [getLocal, setLocal] = useState([]);
  const [recipe, setRecipe] = useState({});
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
    setFullIngredient(fullIngredientsArray.filter((element) => element !== ''));
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
      const value = (Object.values(json.cocktails[recipeId] || []));
      setLocal(value || []);
      setCount(value.length);
    }
  }

  function setRecipeLocalStorage(target) {
    setIngredientsList([...ingredientsList, target.name]);
    const id = recipe.idDrink;
    const exist = localStorage.getItem('inProgressRecipes');
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...json,
        cocktails: { ...json.cocktails, [id]: [...ingredientsList, target.name] } }));
      return;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {
      [id]: [...ingredientsList, target.name] },
    meals: { } }));
  }

  function handleClick({ target }) {
    countChecked(target);
    setClassNameChecked(target);
    const id = recipe.idDrink;
    if (target.checked) {
      setRecipeLocalStorage(target);
      return;
    }
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const value = Object.values(getLocalStorage.cocktails[recipeId])
      .filter((element) => element !== target.name);
    setIngredientsList(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...getLocalStorage,
      cocktails: { ...getLocalStorage.cocktails, [id]: value } }));
  }

  async function fetchApi() {
    const response = await fetchApiByID(recipeId, false);
    getFullIngredients(response);
    setRecipe(response[0]);
  }

  useEffect(() => {
    fetchApi();
    sendLocalStorage();
    const exist = localStorage.getItem('favoriteRecipes');
    if (exist) {
      setHeart(blackHeartIcon);
    }
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
    } else localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    history.push('/receitas-feitas');
  }

  function setFavoriteInLocalStorage() {
    const exist = localStorage.getItem('favoriteRecipes');
    const obj = {
      id: recipeId,
      type: 'bebida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    console.log(obj);

    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...json, obj]));
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  }
  function handleFavorite() {
    setToggleHeart(!toggleHeart);
    if (toggleHeart) {
      setHeart(blackHeartIcon);
      setFavoriteInLocalStorage();
    } else {
      setHeart(whiteHeartIcon);
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filtered = getLocalStorage.filter((element) => element.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
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
      <button type="button" onClick={ handleFavorite }><img data-testid="favorite-btn" src={ heart } alt="favoritar" /></button>
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

DrinkInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkInProgress;

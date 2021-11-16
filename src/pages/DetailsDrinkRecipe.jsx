import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CardRecommendedRecipe from '../components/CardRecommendedRecipe';
import getIngredients from '../helper/helper';
import { fetchApiByID, fetchApiByName } from '../services/FetchApi';

function DetaisDrinkRecipe() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { recipeId } = useParams();

  function getFullIngredients(response) {
    const fullIngredients = [];
    const newIngredients = getIngredients(response, 'strIngredient');
    const amount = getIngredients(response, 'strMeasure');

    newIngredients.forEach((ingredient, index) => {
      let ingredientAndAmount = '';
      if (ingredient !== null) {
        ingredientAndAmount += ingredient;
      }
      if (amount[index] !== null) {
        ingredientAndAmount += ` - ${amount[index]}`;
      }
      fullIngredients.push(ingredientAndAmount);
    });
    return fullIngredients;
  }

  async function fetchDetails() {
    const response = await fetchApiByID(recipeId, false);
    const recommendedResponse = await fetchApiByName('', true);
    setIngredients(getFullIngredients(response));
    setRecommended(recommendedResponse);
    setDetails(response);
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  const MAX_RECOMMENDED = 6;
  const settings = { slidesToShow: 2, infinite: false };

  return (
    <div>
      { details.length > 0 && (
        <>
          <img
            src={ details[0].strDrinkThumb }
            alt={ details[0].strDrink }
            data-testid="recipe-photo"
            className="card-image"
          />
          <h1 data-testid="recipe-title">{details[0].strDrink}</h1>
          <h3 data-testid="recipe-category">{ details[0].strAlcoholic }</h3>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          {' '}
          <label htmlFor="favorite-btn">
            Favoritar
            <input type="checkbox" data-testid="favorite-btn" />
          </label>
          {ingredients.map((ingredient, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </p>
          ))}
          <div>
            <h3>Modo de preparo</h3>
            <p data-testid="instructions">{ details[0].strInstructions }</p>
          </div>
          <div>
            <h3>Comidas Recomendadas</h3>
            <Slider { ...settings }>
              {recommended.meals.slice(0, MAX_RECOMMENDED).map((recipe, index) => (
                <CardRecommendedRecipe
                  key={ index }
                  dataTesteID={ index }
                  src={ recipe.strMealThumb }
                  name={ recipe.strMeal }
                  id={ recipe.idMeal }
                  path={ `/comidas/${recipe.idMeal}` }
                />
              ))}
            </Slider>
          </div>
          <Link to={ `/bebidas/${recipeId}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="Footer"
            >
              Iniciar Receita
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default DetaisDrinkRecipe;

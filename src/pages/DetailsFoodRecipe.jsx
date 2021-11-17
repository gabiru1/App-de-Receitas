import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CardRecommendedRecipe from '../components/CardRecommendedRecipe';
import getIngredients from '../helper/helper';
import { fetchApiByID, fetchApiByName } from '../services/FetchApi';

function DetailsFoodRecipe() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { recipeId } = useParams();

  function getVideoId(data) {
    const EXCLUDE_HTTP = 32;
    const videoId = data[0].strYoutube.slice(EXCLUDE_HTTP);
    console.log(videoId, 'id');
    return videoId;
  }

  function getFullIngredients(response) {
    const fullIngredients = [];
    const newIngredients = getIngredients(response, 'strIngredient');
    const amount = getIngredients(response, 'strMeasure');

    newIngredients.forEach((ingredient, index) => {
      let ingredientAndAmount = '';
      if (ingredient !== (null || '')) {
        ingredientAndAmount += ingredient;
      }
      if (amount[index] !== (null || '')) {
        ingredientAndAmount += ` - ${amount[index]}`;
      }
      fullIngredients.push(ingredientAndAmount);
    });
    return fullIngredients;
  }

  async function fetchDetails() {
    const response = await fetchApiByID(recipeId, true);
    const recommendedResponse = await fetchApiByName('', false);
    setIngredients(getFullIngredients(response));
    setRecommended(recommendedResponse);
    setDetails(response);
    getVideoId(response);
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
            src={ details[0].strMealThumb }
            alt={ details[0].strMeal }
            data-testid="recipe-photo"
            className="card-image"
          />
          <h1 data-testid="recipe-title">{details[0].strMeal}</h1>
          <h3 data-testid="recipe-category">{ details[0].strCategory }</h3>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          {' '}
          <label htmlFor="favorite-btn">
            Favoritar
            <input type="checkbox" data-testid="favorite-btn" />
          </label>
          {ingredients.map((ingredient, index) => (
            (ingredient !== ' -  ') && (
              <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingredient}
              </p>
            )))}
          <div>
            <h3>Modo de preparo</h3>
            <p data-testid="instructions">{ details[0].strInstructions }</p>
          </div>
          <div className="video-responsive">
            <iframe
              data-testid="video"
              width="360"
              height="360"
              src={ `https://www.youtube.com/embed/${getVideoId(details)}` }
              frameBorder="0"
              allow={ `accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture` }
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <div className="carousel">
            <h3>Bebidas Recomendadas</h3>
            <Slider { ...settings }>
              {recommended.drinks.slice(0, MAX_RECOMMENDED).map((recipe, index) => (
                <CardRecommendedRecipe
                  key={ index }
                  alcoholic={ recipe.strAlcoholic }
                  dataTesteID={ index }
                  src={ recipe.strDrinkThumb }
                  name={ recipe.strDrink }
                  id={ recipe.idDrink }
                  path={ `/bebidas/${recipe.idDrink}` }
                />
              ))}
            </Slider>
          </div>
          <Link to={ `/comidas/${recipeId}/in-progress` }>
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

export default DetailsFoodRecipe;

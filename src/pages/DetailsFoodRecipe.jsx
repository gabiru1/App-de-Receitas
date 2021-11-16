import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '../components/Card';
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

  async function fetchDetails() {
    const response = await fetchApiByID(recipeId, true);
    const recommendedResponse = await fetchApiByName('', false);
    const ingredientsArray = [];
    const ingredientsValue = Object.values(response[0]);
    Object.keys(response[0]).forEach((element, index) => element.includes('strIngredient')
      && ingredientsArray.push(ingredientsValue[index]));
    setIngredients(ingredientsArray);
    setRecommended(recommendedResponse);
    setDetails(response);
    getVideoId(response);
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  const MAX_RECOMMENDED = 6;

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
            (ingredient !== '' && ingredient !== null)
            && (
              <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingredient}
              </p>
            )
          ))}
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
          <div>
            <h3>Bebidas Recomendadas</h3>
            {recommended.drinks.slice(0, MAX_RECOMMENDED).map((recipe, index) => (
              <Card
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                src={ recipe.strDrinkThumb }
                name={ recipe.strDrink }
                id={ recipe.idDrink }
                path="bebidas"
              />
            ))}
          </div>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="Footer"
          >
            Iniciar Receita
          </button>
        </>
      )}
    </div>
  );
}

export default DetailsFoodRecipe;

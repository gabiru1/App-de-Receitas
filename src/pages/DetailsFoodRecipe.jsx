import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchApiByID } from '../services/FetchApi';

function DetailsFoodRecipe() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { recipeId } = useParams();

  async function fetchDetails() {
    const response = await fetchApiByID(recipeId, true);
    console.log(response);
    const ingredientsArray = [];
    const ingredientsValue = Object.values(response[0]);
    Object.keys(response[0]).forEach((element, index) => element.includes('strIngredient')
      && ingredientsArray.push(ingredientsValue[index]));
    console.log(ingredientsArray);
    setIngredients(ingredientsArray);
    setDetails(response);
  }

  useEffect(() => {
    fetchDetails();
  }, []);

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
            ingredient.length > 0
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
          <video width="350" height="640" controls data-testid="video">
            <source src={ details[0].strYoutube } />
            <track kind="captions" />
          </video>
        </>
      )}
    </div>
  );
}

export default DetailsFoodRecipe;

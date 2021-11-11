import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchApiByID } from '../services/FetchApi';

function DetaisDrinkRecipe() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { recipeId } = useParams();

  async function fetchDetails() {
    const response = await fetchApiByID(recipeId, false);
    const ingredientsArray = [];
    const ingredientsValue = Object.values(response[0]);
    Object.keys(response[0]).forEach((element, index) => element.includes('strIngredient')
      && ingredientsArray.push(ingredientsValue[index]));
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
            src={ details[0].strDrinkThumb }
            alt={ details[0].strDrink }
            data-testid="recipe-photo"
            className="card-image"
          />
          <h1 data-testid="recipe-title">{details[0].strDrink}</h1>
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
          <p data-testid={ `${'index'}-recomendation-card` }>Receitas recomendadas</p>
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

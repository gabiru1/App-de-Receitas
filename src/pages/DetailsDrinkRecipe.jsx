import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CardRecommendedRecipe from '../components/CardRecommendedRecipe';
import { getFullIngredients } from '../helper/helper';
import { fetchApiByID, fetchApiByName } from '../services/FetchApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import setDrinkFavoriteInLocalStorage from '../helper/setFavoriteDrinkInLocalStorage';
import ShareButton from '../components/ShareButton';

function DetaisDrinkRecipe() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [toggleHeart, setToggleHeart] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const { recipeId } = useParams();

  async function fetchDetails() {
    const response = await fetchApiByID(recipeId, false);
    const recommendedResponse = await fetchApiByName('', true);
    setIngredients(getFullIngredients(response));
    setRecommended(recommendedResponse);
    setDetails(response);
  }

  useEffect(() => {
    fetchDetails();
    const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const getinProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { cocktails: {} };
    const isFavorite = getFavoriteRecipe.find((element) => element.id === recipeId);
    const isInProgress = getinProgressRecipes.cocktails;
    if (isFavorite) {
      setHeart(blackHeartIcon);
      setToggleHeart(!toggleHeart);
    }
    if (Object.keys(isInProgress)[0] === recipeId) {
      setShowBtn(true);
    }
  }, []);

  function handleFavorite() {
    setToggleHeart(!toggleHeart);
    if (toggleHeart) {
      setHeart(blackHeartIcon);
      setDrinkFavoriteInLocalStorage(details[0], recipeId);
    } else {
      setHeart(whiteHeartIcon);
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filtered = getLocalStorage.filter((element) => element.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
  }

  const MAX_RECOMMENDED = 6;
  const settings = { slidesToShow: 2, infinite: false };

  return (
    <section>
      { details.length > 0 && (
        <section>
          <img
            src={ details[0].strDrinkThumb }
            alt={ details[0].strDrink }
            data-testid="recipe-photo"
            className="card-image"
          />
          <h1 data-testid="recipe-title">{details[0].strDrink}</h1>
          <button type="button" onClick={ handleFavorite }>
            <img data-testid="favorite-btn" src={ heart } alt="favoritar" />
          </button>
          <ShareButton path={ `bebidas/${recipeId}` } />
          <h3 data-testid="recipe-category">{ details[0].strAlcoholic }</h3>
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
          <Link
            data-testid="start-recipe-btn"
            className="link-btn-footer"
            to={ `/bebidas/${recipeId}/in-progress` }
          >
            <button
              type="button"
              className="btn-footer"
            >
              { showBtn ? 'Continuar Receita' : 'Iniciar Receita' }
            </button>
          </Link>
        </section>
      )}
    </section>
  );
}

export default DetaisDrinkRecipe;

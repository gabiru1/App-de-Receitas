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
import setFoodFavoriteInLocalStorage from '../helper/setFoodFavoriteInLocalStorage';
import ShareButton from '../components/ShareButton';

function DetailsFoodRecipe() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [toggleHeart, setToggleHeart] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const { recipeId } = useParams();

  const MAX_RECOMMENDED = 6;
  const settings = { slidesToShow: 2, infinite: false };

  function getVideoId(data) {
    const EXCLUDE_HTTP = 32;
    const videoId = data[0].strYoutube.slice(EXCLUDE_HTTP);
    return videoId;
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
    const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const getinProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {} };
    const isFavorite = getFavoriteRecipe.find((element) => element.id === recipeId);
    const isInProgress = getinProgressRecipes.meals;
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
      setFoodFavoriteInLocalStorage(details[0], recipeId);
    } else {
      setHeart(whiteHeartIcon);
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filtered = getLocalStorage.filter((element) => element.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
  }

  return (
    <section>
      { details.length > 0 && (
        <section>
          <img
            src={ details[0].strMealThumb }
            alt={ details[0].strMeal }
            data-testid="recipe-photo"
            className="card-image"
          />
          <h1 data-testid="recipe-title">{details[0].strMeal}</h1>
          <button type="button" onClick={ handleFavorite }>
            <img data-testid="favorite-btn" src={ heart } alt="favoritar" />
          </button>
          <ShareButton path={ `comidas/${recipeId}` } />
          <h3 data-testid="recipe-category">{ details[0].strCategory }</h3>
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
          <Link
            data-testid="start-recipe-btn"
            className="link-btn-footer"
            to={ `/comidas/${recipeId}/in-progress` }
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

export default DetailsFoodRecipe;

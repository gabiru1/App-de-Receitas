import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';

function FavoritesRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredData, setFilteredData] = useState(favoriteRecipes);

  function getFavoriteRecipesFromLocalStorage() {
    const recipes = localStorage.getItem('favoriteRecipes');
    if (recipes) {
      const data = JSON.parse(recipes);
      setFavoriteRecipes(data);
      setFilteredData(data);
    } else {
      setFavoriteRecipes([]);
    }
  }

  useEffect(() => {
    getFavoriteRecipesFromLocalStorage();
  }, []);

  function handleFavorite(id) {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtered = getLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    setFilteredData(filtered);
  }

  function filterDataByType(type) {
    if (type !== 'all') {
      setFilteredData(favoriteRecipes.filter((value) => value.type === type));
      return true;
    }
    setFilteredData(favoriteRecipes);
  }

  return (
    <section>
      <Header title="Receitas Favoritas" showSearchBtn={ false } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterDataByType('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterDataByType('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterDataByType('bebida') }
        >
          Drinks
        </button>
        <section>
          { filteredData.map((recipe, index) => (
            <div key={ recipe.id }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  width="200px"
                />
                <h2 data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </h2>
              </Link>
              <h3 data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'comida' ? (
                  `${recipe.area} - ${recipe.category}`
                ) : (
                  `${recipe.alcoholicOrNot}`
                )}
              </h3>
              <div>
                <button type="button" onClick={ () => handleFavorite(recipe.id) }>
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favoritar"
                  />
                </button>
                <ShareButton
                  path={ `${recipe.type}s/${recipe.id}` }
                  dataTest={ `${index}-horizontal-share-btn` }
                />
              </div>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
}

export default FavoritesRecipes;

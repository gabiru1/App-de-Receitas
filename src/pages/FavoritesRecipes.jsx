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
    <section className="section-favorite-page">
      <Header title="Receitas Favoritas" showSearchBtn={ false } />
      <section>
        <div className="container-buttons-filter">
          <button
            type="button"
            className="btn-filter-type"
            data-testid="filter-by-all-btn"
            onClick={ () => filterDataByType('all') }
          >
            All
          </button>
          <button
            type="button"
            className="btn-filter-type"
            data-testid="filter-by-food-btn"
            onClick={ () => filterDataByType('comida') }
          >
            Food
          </button>
          <button
            type="button"
            className="btn-filter-type"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterDataByType('bebida') }
          >
            Drinks
          </button>
        </div>
        <section className="container-card-favorite">
          { filteredData.map((recipe, index) => (
            <div key={ recipe.id } className="card-favorite">
              <Link to={ `/${recipe.type}s/${recipe.id}` } className="link-favorite">
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="img-favorite"
                />
                <h3 data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </h3>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'comida' ? (
                  `${recipe.area} - ${recipe.category}`
                ) : (
                  `${recipe.alcoholicOrNot}`
                )}
              </p>
              <div className="btns-favorite">
                <div>
                  <button
                    type="button"
                    onClick={ () => handleFavorite(recipe.id) }
                    className="search-btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="favoritar"
                    />
                  </button>
                </div>
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

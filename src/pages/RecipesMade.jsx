import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardRecipesMade from '../components/CardRecipesMade';

function RecipesMade() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredData, setFilteredData] = useState(doneRecipes);

  function getDoneRecipesFromLocalStorage() {
    const recipes = localStorage.getItem('doneRecipes');
    if (recipes) {
      const data = JSON.parse(recipes);
      setDoneRecipes(data);
      setFilteredData(data);
    } else {
      setDoneRecipes([]);
    }
  }
  useEffect(() => {
    getDoneRecipesFromLocalStorage();
  }, []);

  function filterDataByType(type) {
    if (type !== 'all') {
      setFilteredData(doneRecipes.filter((value) => value.type === type));
      return true;
    }
    setFilteredData(doneRecipes);
  }

  return (
    <div>
      <Header title="Receitas Feitas" showSearchBtn={ false } />
      <section className="container-buttons-filter">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="btn-filter-type"
          onClick={ () => filterDataByType('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="btn-filter-type"
          onClick={ () => filterDataByType('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="btn-filter-type"
          onClick={ () => filterDataByType('bebida') }
        >
          Drinks
        </button>
      </section>
      <section className="container-card-favorite">
        {filteredData
          .map(
            (
              { image, name, category, doneDate, tags, type, area, alcoholicOrNot, id },
              index,
            ) => (
              <CardRecipesMade
                key={ index }
                image={ image }
                name={ name }
                category={ category }
                doneDate={ doneDate }
                tags={ tags }
                index={ index }
                type={ type }
                area={ area }
                alcoholic={ alcoholicOrNot }
                id={ id }
              />),
          )}
      </section>
    </div>
  );
}

export default RecipesMade;

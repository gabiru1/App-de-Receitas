import React, { useState } from 'react';
import Header from '../components/Header';
import CardRecipesMade from '../components/CardRecipesMade';

function RecipesMade() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const [filteredData, setFilteredData] = useState(doneRecipes);

  function filterDataByType(type) {
    switch (type) {
    case 'comida':
      setFilteredData(doneRecipes.filter((value) => value.type === type));
      break;
    case 'bebida':
      setFilteredData(doneRecipes.filter((value) => value.type === type));
      break;
    default:
      setFilteredData(doneRecipes);
      break;
    }
  }

  return (
    <div>
      <Header title="Receitas Feitas" showSearchBtn={ false } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterDataByType }
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
      </section>
      <section>
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

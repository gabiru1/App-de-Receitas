import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../Context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngredients from '../components/CardIngredients';
import { fetchApiIngredientsList, fetchApiByIngredient } from '../services/FetchApi';

function ExploreFoodsByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setData } = useContext(RecipesContext);
  const maxResults = 12;

  async function getIngredientsList() {
    const result = await fetchApiIngredientsList(true);
    setIngredientsList(result);
  }

  async function handleClick(ingredient) {
    const results = await fetchApiByIngredient(ingredient, true);
    setData(results.meals);
  }

  useEffect(() => {
    getIngredientsList();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchBtn={ false } />
      <div className="card-container">
        { ingredientsList.slice(0, maxResults).map(({ strIngredient }, index) => (
          <CardIngredients
            onClick={ () => handleClick(strIngredient) }
            path="/comidas"
            key={ strIngredient }
            imgUrl={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            ingredient={ strIngredient }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredient;

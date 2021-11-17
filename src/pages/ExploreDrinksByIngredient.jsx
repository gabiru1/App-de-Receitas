import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../Context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngredients from '../components/CardIngredients';
import { fetchApiIngredientsList, fetchApiByIngredient } from '../services/FetchApi';

function ExploreDrinksByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setData, setRenderData } = useContext(RecipesContext);
  const maxResults = 12;

  async function getIngredientsList() {
    const result = await fetchApiIngredientsList();
    setIngredientsList(result);
  }

  async function handleClick(ingredient) {
    const results = await fetchApiByIngredient(ingredient, false);
    setData(results.drinks);
  }

  useEffect(() => {
    getIngredientsList();
    setRenderData(false);
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchBtn={ false } />
      <div className="card-container">
        { ingredientsList.slice(0, maxResults).map(({ strIngredient1 }, index) => (
          <CardIngredients
            onClick={ () => handleClick(strIngredient1) }
            path="/bebidas"
            key={ strIngredient1 }
            imgUrl={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            ingredient={ strIngredient1 }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredient;

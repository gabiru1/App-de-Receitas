import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngredients from '../components/CardIngredients';
import { fetchApiIngredientsList } from '../services/FetchApi';

function ExploreDrinksByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const maxResults = 12;

  async function getIngredientsList() {
    const result = await fetchApiIngredientsList();
    setIngredientsList(result);
  }

  useEffect(() => {
    getIngredientsList();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchBtn={ false } />
      <div className="card-container">
        { ingredientsList.slice(0, maxResults).map(({ strIngredient1 }, index) => (
          <CardIngredients
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

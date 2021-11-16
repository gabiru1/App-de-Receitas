import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngredients from '../components/CardIngredients';
import { fetchApiIngredientsList } from '../services/FetchApi';

function ExploreFoodsByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const maxResults = 12;

  async function getIngredientsList() {
    const result = await fetchApiIngredientsList(true);
    setIngredientsList(result);
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

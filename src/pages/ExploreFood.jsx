import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood({ history }) {
  const [randonFood, setRandonFood] = useState([]);
  async function fetchRandonFood() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const result = await response.json();
    return setRandonFood(result.meals[0].idMeal);
  }

  useEffect(() => {
    fetchRandonFood();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" showSearchBtn={ false } />
      <div className="container-buttons-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/comidas/${randonFood}`) }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreFood;

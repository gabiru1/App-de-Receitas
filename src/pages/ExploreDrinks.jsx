import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks({ history }) {
  const [randonDrink, setRandonDrink] = useState([]);

  async function fetchRandonDrink() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const result = await response.json();
    return setRandonDrink(result.drinks[0].idDrink);
  }

  useEffect(() => {
    fetchRandonDrink();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" showSearchBtn={ false } />
      <div className="container-buttons-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/bebidas/${randonDrink}`) }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreDrinks;

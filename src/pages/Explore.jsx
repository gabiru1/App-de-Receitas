import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header title="Explorar" showSearchBtn={ false } />
      <div>
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;

import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodsByIngredient() {
  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchBtn={ false } />
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredient;

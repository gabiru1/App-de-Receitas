import React from 'react';
import PropTypes from 'prop-types';

function CardIngredients({ ingredient, index, imgUrl }) {
  return (
    <div
      className="card"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        src={ imgUrl }
        alt={ ingredient }
        data-testid={ `${index}-card-img` }
        className="card-image"
      />
      <h3
        data-testid={ `${index}-card-name` }
        className="card-title"
      >
        { ingredient }
      </h3>
    </div>
  );
}

CardIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default CardIngredients;

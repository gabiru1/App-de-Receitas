import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardIngredients({ ingredient, index, imgUrl, path, onClick }) {
  return (
    <Link
      onClick={ onClick }
      to={ `${path}` }
      className="card"
    >
      <div
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
    </Link>
  );
}

CardIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardIngredients;

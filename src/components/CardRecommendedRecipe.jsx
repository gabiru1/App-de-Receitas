import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardRecommendedRecipe({ src, name, dataTesteID, path, alcoholic }) {
  return (
    <Link
      to={ path }
    >
      <div>
        <img
          src={ src }
          alt={ name }
          className="card-image"
          data-testid={ `${dataTesteID}-recomendation-card` }
        />
        <h3
          data-testid={ `${dataTesteID}-recomendation-title` }
        >
          { name }
        </h3>
        <p>{alcoholic}</p>
      </div>
    </Link>
  );
}

CardRecommendedRecipe.propTypes = {
  dataTesteID: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
}.isRequired;

export default CardRecommendedRecipe;

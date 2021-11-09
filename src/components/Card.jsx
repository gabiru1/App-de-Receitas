import PropTypes from 'prop-types';
import React from 'react';

function Card({ src, name, dataTesteID }) {
  return (
    <div className="card">
      <div
        data-testid={ `${dataTesteID}-recipe-card` }
      >
        <img
          src={ src }
          alt={ name }
          data-testid={ `${dataTesteID}-card-img` }
          className="card-image"
        />
        <h3
          data-testid={ `${dataTesteID}-card-name` }
          className="card-title"
        >
          { name }
        </h3>
      </div>
    </div>
  );
}

Card.propTypes = {
  dataTesteID: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
}.isRequired;

export default Card;

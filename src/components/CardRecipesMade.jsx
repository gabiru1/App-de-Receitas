import PropTypes from 'prop-types';
import React from 'react';

function CardRecipesMade({ image, index, name, category, doneDate, tags }) {
  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        width="200px"
      />
      <h2 data-testid={ `${index}-horizontal-name` }>
        {name}
      </h2>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        {category}
      </h3>
      <h3 data-testid={ `${index}-horizontal-done-date` }>
        {doneDate}
      </h3>
      {tags.length > 0 && tags.map((tagName) => (
        <h3
          data-testid={ `${index}-${tagName}-horizontal-tag` }
          key={ `${tagName}${index}` }
        >
          {tagName}
        </h3>
      ))}
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar
      </button>
    </div>
  );
}

CardRecipesMade.defaultProps = {
  category: '',
  doneDate: '',
  image: '',
  index: '',
  name: '',
  tags: '',
};

CardRecipesMade.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default CardRecipesMade;

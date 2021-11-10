import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const copy = require('clipboard-copy');

function CardRecipesMade(
  { image, index, name, category, doneDate, tags, type, area, alcoholic, id },
) {
  function copyToClipBoard() {
    const urlToCopy = `${window.location.origin}/comidas/${id}`;
    copy(urlToCopy);
    global.alert('Link copiado!');
  }

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="200px"
        />
        <h2 data-testid={ `${index}-horizontal-name` }>
          {name}
        </h2>
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        {type === 'comida' ? (
          `${area} - ${category}`
        ) : (
          `${alcoholic}`
        )}
      </h3>
      <h3 data-testid={ `${index}-horizontal-done-date` }>
        {doneDate}
      </h3>
      <div>
        {tags.length > 0 && tags.map((tagName) => (
          <h3
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            key={ `${tagName}${index}` }
          >
            {tagName}
          </h3>
        ))}
      </div>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src="src/images/shareIcon.svg"
        width="10px"
        onClick={ copyToClipBoard }
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
  type: '',
  area: '',
  alcoholic: '',
  id: '',
};

CardRecipesMade.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  area: PropTypes.string,
  alcoholic: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default CardRecipesMade;

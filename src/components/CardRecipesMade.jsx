import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardRecipesMade(
  { image, index, name, category, doneDate, tags, type, area, alcoholic, id },
) {
  const [showAlert, setShowAlert] = useState(false);

  function closeAlert() {
    const timeToClose = 1000;
    setTimeout(() => {
      setShowAlert(false);
    }, timeToClose);
  }
  function copyToClipBoard() {
    const urlToCopy = `${window.location.origin}/${type}s/${id}`;
    const copyUrl = copy(urlToCopy).catch((error) => console.log(error, copyUrl));
    setShowAlert(true);
    closeAlert();
  }

  function createAlert() {
    return (
      <div>
        <Alert variant="success">Link copiado!</Alert>
      </div>);
  }

  return (
    <div className="card-favorite">
      <Link to={ `/${type}s/${id}` } className="link-favorite">
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="img-favorite"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          {name}
        </h3>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'comida' ? (
          `${area} - ${category}`
        ) : (
          `${alcoholic}`
        )}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {doneDate}
      </p>
      <div>
        {tags.length > 0 && tags.map((tagName) => (
          <p
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            key={ `${tagName}${index}` }
          >
            {tagName}
          </p>
        ))}
      </div>
      {showAlert && createAlert()}
      <div>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src="src/images/shareIcon.svg"
          onClick={ copyToClipBoard }
          className="search-btn"
        >
          <img src={ shareIcon } alt="share" />
        </button>
      </div>
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

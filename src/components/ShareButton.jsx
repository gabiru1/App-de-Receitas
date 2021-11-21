import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ path }) {
  const [showAlert, setShowAlert] = useState(false);

  function closeAlert() {
    const timeToClose = 1000;
    setTimeout(() => {
      setShowAlert(false);
    }, timeToClose);
  }
  function copyToClipBoard() {
    const urlToCopy = `${window.location.origin}/${path}`;
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
    <div>
      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        width="10px"
        onClick={ copyToClipBoard }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {showAlert && createAlert()}
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string,
};

ShareButton.defaultProps = {
  path: '',
};

export default ShareButton;

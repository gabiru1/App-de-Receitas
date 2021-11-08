import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearchBtn }) {
  return (
    <header>
      <div>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile Icon" />
        </Link>
      </div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      <div>
        {showSearchBtn && (
          <button
            type="button"
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Button Search" />
          </button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showSearchBtn: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  showSearchBtn: true,
};

export default Header;

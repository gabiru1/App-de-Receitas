import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearchBtn }) {
  const [showInputSearch, setShowInputSearch] = useState(false);
  return (
    <section>
      <header className="header-container">
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
            <Button
              type="button"
              variant="outline-light"
              onClick={ () => setShowInputSearch(!showInputSearch) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="Button Search" />
            </Button>
          )}
        </div>
      </header>
      <div className="search-bar-container">
        {showInputSearch && (
          <input
            className="search-bar"
            type="text"
            data-testid="search-input"
            name="searchInput"
            placeholder="Buscar Receita"
          />
        )}
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showSearchBtn: PropTypes.bool,
};

Header.defaultProps = {
  title: '',
  showSearchBtn: true,
};

export default Header;

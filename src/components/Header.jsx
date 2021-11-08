import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearchBtn }) {
  const [showInputSearch, setShowInputSearch] = useState(false);
  const [radioValue, setRadioValue] = useState('');

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
      {showInputSearch && (
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            data-testid="search-input"
            name="searchInput"
            placeholder="Buscar Receita"
          />
          <label htmlFor="ingrediente">
            <input
              id="ingrediente"
              type="radio"
              value="ingrediente"
              name="radio-search"
              data-testid="ingredient-search-radio"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Ingrediente
          </label>
          <label htmlFor="nome">
            <input
              id="nome"
              type="radio"
              value="nome"
              name="radio-search"
              data-testid="name-search-radio"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Nome
          </label>
          <label htmlFor="primeira-letra">
            <input
              id="primeira-letra"
              type="radio"
              value="primeira-letra"
              name="radio-search"
              data-testid="first-letter-search-radio"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Primeira letra
          </label>
          <button type="button" data-testid="exec-search-btn">Buscar</button>
        </div>
      )}
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

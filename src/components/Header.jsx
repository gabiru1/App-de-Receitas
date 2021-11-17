import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Link } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearchBtn, handleClick }) {
  const [showInputSearch, setShowInputSearch] = useState(false);
  const { searchValue, setSearchValue } = useContext(RecipesContext);
  const { setRadioValue } = useContext(RecipesContext);

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
            <button
              type="button"
              className="search-btn"
              onClick={ () => setShowInputSearch(!showInputSearch) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="Button Search" />
            </button>
          )}
        </div>
      </header>
      {showInputSearch && (
        <div className="search-bar-container">
          <div className="input-bar-container">
            <input
              className="search-bar"
              type="text"
              data-testid="search-input"
              name="searchInput"
              placeholder="Buscar Receita"
              value={ searchValue }
              onChange={ ({ target }) => setSearchValue(target.value) }
            />
          </div>
          <div className="radios-container">
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
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClick }
            >
              Buscar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showSearchBtn: PropTypes.bool,
  handleClick: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  showSearchBtn: true,
  handleClick: null,
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explore Icon" />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal Icon" />
      </Link>
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
      </Link>
    </footer>
  );
}

export default Footer;

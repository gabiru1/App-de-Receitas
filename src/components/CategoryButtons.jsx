import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchApi } from '../services/FetchApi';
import RecipesContext from '../Context/RecipesContext';

function CategoryButtons() {
  const location = useLocation();
  const { setData, setIsSearchBar } = useContext(RecipesContext);
  const [categories, setcategories] = useState([]);
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const fetchCategory = async () => {
    const FIRST_CATEGORY = 5;
    if (location.pathname === '/comidas') {
      const api = await fetchApi(URL_FOOD);
      setcategories(api.meals.slice(0, FIRST_CATEGORY));
    } else {
      const api = await fetchApi(URL_DRINK);
      setcategories(api.drinks.slice(0, FIRST_CATEGORY));
    }
  };
  async function handleClick({ target }) {
    setIsSearchBar(false);
    console.log(target.id);
    let type = '';
    let URL = '';
    const URL_FOOD_NAME = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`;
    const URL_DRINK_NAME = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${target.id}`;
    if (location.pathname === '/comidas') {
      URL = URL_FOOD_NAME;
      type = 'meals';
    } else {
      URL = URL_DRINK_NAME;
      type = 'drinks';
    }
    const api = await fetchApi(URL);
    if (!api[type]) {
      global.alert('Não existe receita para essa categoria');
    } else {
      setData(api[type] || []);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <button
          id={ category.strCategory }
          type="button"
          onClick={ (event) => handleClick(event) }
          data-testid={ `${category.strCategory}-category-filter` }
          key={ category.strCategory }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;

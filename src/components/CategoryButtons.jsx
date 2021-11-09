import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchApi } from '../services/FetchApi';
import RecipesContext from '../Context/RecipesContext';

function CategoryButtons() {
  const location = useLocation();
  const { setData, setIsSearchBar } = useContext(RecipesContext);
  const [toggle, setToggle] = useState(false);
  const [nameCategory, setNameCategory] = useState('');
  const [categories, setcategories] = useState([]);
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const fetchCategory = async () => {
    const FIRST_CATEGORY = 5;
    if (location.pathname === '/comidas') {
      const api = await fetchApi(URL_FOOD, true);
      setcategories(api.slice(0, FIRST_CATEGORY));
    } else {
      const api = await fetchApi(URL_DRINK, false);
      setcategories(api.slice(0, FIRST_CATEGORY, false));
    }
  };

  async function handleClick({ target }) {
    setIsSearchBar(false);
    setToggle(true);
    let URL = '';

    if (nameCategory === target.id && toggle) {
      let resultApi = [];

      if (location.pathname === '/comidas') {
        resultApi = await fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?i', true);
      } else {
        resultApi = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', false);
      }
      setData(resultApi);
      setToggle(false);
    } else {
      const URL_FOOD_NAME = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`;
      const URL_DRINK_NAME = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.id}`;
      let api = '';
      if (location.pathname === '/comidas') {
        URL = URL_FOOD_NAME;
        api = await fetchApi(URL, true);
      } else {
        URL = URL_DRINK_NAME;
        api = await fetchApi(URL, false);
      }
      if (!api) {
        global.alert('Não existe receita para essa categoria');
      } else {
        setData(api || []);
      }
    }
    setNameCategory(target.id);
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

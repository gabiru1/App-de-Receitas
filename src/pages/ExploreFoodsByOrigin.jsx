import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchApi } from '../services/FetchApi';

function ExploreFoodsByOrigin() {
  const [areas, setAreas] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const maxResults = 12;

  async function fetchAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const result = await response.json();
    return setAreas(result.meals);
  }

  async function renderMeals() {
    const resultApi = await fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?i', true);
    setMeals(resultApi);
  }

  useEffect(() => {
    fetchAreas();
    renderMeals();
  }, []);

  return (
    <div>
      <Header title="Explorar Origem" showSearchBtn />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          name="selectedArea"
          value={ selectedArea }
          onChange={ ({ target }) => setSelectedArea(target.value) }
        >
          {areas.map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ strArea }
              value={ strArea }
            >
              {strArea}
            </option>
          ))}
        </select>
      </div>
      <div className="card-container">
        {meals.slice(0, maxResults).map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div
            key={ idMeal }
            data-testid={ `${index}-recipe-card` }
            className="card"
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
              className="card-image"
            />
            <h3
              data-testid={ `${index}-card-name` }
              className="card-title"
            >
              { strMeal }
            </h3>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByOrigin;

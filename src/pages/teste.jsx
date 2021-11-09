import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';

function Foods() {
  /* const { filteredRequest } = useContext(contextValue); */
  const [foods, setFoods] = useState([]);
  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i';

  const fetchFoods = async () => {
    const FIRST_FOODS = 12;
    const response = await fetch(URL);
    const resolve = await response.json();
    console.log(resolve);
    setFoods(resolve.meals.slice(0, FIRST_FOODS)); // entrar com os dados da api aqui
  };
  useEffect(() => {
    fetchFoods();
  }, []);
  return (
    <div>
      <Header title="Comidas" showSearchBtn />
      <CategoryButtons />
      {
        foods.map((food) => (
          <div key={ food.idMeal } data-testid={ `${food.idMeal}-recipe-card` }>
            {food.strMeal}
            <img src={ food.strMealThumb } alt={ food.strMeal } width="100px" />
          </div>
        ))
      }
    </div>
  );
}

export default Foods;

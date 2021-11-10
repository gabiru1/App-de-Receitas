import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchApiByID } from '../services/FetchApi';

function DetailsFoodRecipe() {
  const [details, setDetails] = useState([]);
  const { recipeId } = useParams();
  const fetchDetails = async () => {
    const response = await fetchApiByID(recipeId, true);
    console.log(response, 'aqui');
    setDetails(response);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <img src={ details.strMealThumb } alt={ details.strMeal } />
    </div>
  );
}

export default DetailsFoodRecipe;

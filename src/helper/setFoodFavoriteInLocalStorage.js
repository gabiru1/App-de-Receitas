export default function setFoodFavoriteInLocalStorage(recipe, recipeId) {
  const exist = localStorage.getItem('favoriteRecipes');
  const obj = {
    id: recipeId,
    type: 'comida',
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };

  if (exist) {
    const json = JSON.parse(exist);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...json, obj]));
    return;
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
}

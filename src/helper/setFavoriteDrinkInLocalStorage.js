export default function setDrinkFavoriteInLocalStorage(recipe, recipeId) {
  const exist = localStorage.getItem('favoriteRecipes');
  const obj = {
    id: recipeId,
    type: 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };

  if (exist) {
    const json = JSON.parse(exist);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...json, obj]));
    return;
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
}

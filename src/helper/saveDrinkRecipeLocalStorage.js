function getDate() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  return dataAtual;
}

export default function saveDrinkRecipeLocalStorage(recipe, recipeId, history) {
  const exist = localStorage.getItem('doneRecipes');
  let tags = [];
  if (!recipe.strTags === ('' || null)) {
    tags = recipe.strTags;
  }
  const doneRecipe = {
    id: recipeId,
    type: 'bebida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: getDate(),
    tags,
  };

  if (exist) {
    const json = JSON.parse(exist);
    localStorage.setItem('doneRecipes', JSON.stringify([...json, doneRecipe]));
  } else localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  history.push('/receitas-feitas');
}

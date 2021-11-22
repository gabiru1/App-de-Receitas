export function getIngredients(response, strContains) {
  const ingredientsArray = [];
  const ingredientsValue = Object.values(response[0]);
  Object.keys(response[0]).forEach((element, index) => element.includes(strContains)
      && ingredientsArray.push(ingredientsValue[index]));
  return ingredientsArray;
}

export function getFullIngredients(response) {
  const fullIngredients = [];
  const newIngredients = getIngredients(response, 'strIngredient');
  const amount = getIngredients(response, 'strMeasure');

  newIngredients.forEach((ingredient, index) => {
    let ingredientAndAmount = '';
    if (ingredient !== (null || '')) {
      ingredientAndAmount += ingredient;
    }
    if (amount[index] !== (null || '')) {
      ingredientAndAmount += ` - ${amount[index]}`;
    }
    fullIngredients.push(ingredientAndAmount);
  });
  return fullIngredients.filter((element) => element !== 'null - null');
}

export function getFullIngredientsDrinks(response) {
  const fullIngredients = [];
  const newIngredients = getIngredients(response, 'strIngredient');
  const amount = getIngredients(response, 'strMeasure');

  newIngredients.forEach((ingredient, index) => {
    let ingredientAndAmount = '';
    if (ingredient !== null) {
      ingredientAndAmount += ingredient;
    }
    if (amount[index] !== null) {
      ingredientAndAmount += ` - ${amount[index]}`;
    }
    fullIngredients.push(ingredientAndAmount);
  });
  return fullIngredients.filter((element) => element !== ' - ');
}

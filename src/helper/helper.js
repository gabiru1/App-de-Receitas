export default function getIngredients(response, strContains) {
  const ingredientsArray = [];
  const ingredientsValue = Object.values(response[0]);
  Object.keys(response[0]).forEach((element, index) => element.includes(strContains)
      && ingredientsArray.push(ingredientsValue[index]));
  return ingredientsArray;
}

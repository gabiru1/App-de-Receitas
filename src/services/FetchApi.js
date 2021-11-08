export async function fetchApiByIngredient(ingrediente) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await response.json();
  return result;
}

export async function fetchApiByName(nome) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const result = await response.json();
  return result;
}

export async function fetchApiByFirstLetter(primeiraLetra) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const result = await response.json();
  return result;
}

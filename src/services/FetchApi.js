export async function fetchApiByIngredient(ingrediente, food) {
  if (food) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const result = await response.json();
    return result;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await response.json();
  return result;
}

export async function fetchApiByName(nome, food) {
  if (food) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const result = await response.json();
    return result;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const result = await response.json();
  return result;
}

export async function fetchApiByFirstLetter(primeiraLetra, food) {
  if (food) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const result = await response.json();
    return result;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const result = await response.json();
  return result;
}

export async function fetchApi(url) {
  const response = await fetch(url);
  const resolve = await response.json();
  return resolve;
}

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

export async function fetchApiByID(id, food) {
  if (food) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    return result.meals;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await response.json();
  return result.drinks;
}

export async function fetchApi(url, food) {
  const response = await fetch(url);
  const resolve = await response.json();
  if (food) {
    return resolve.meals;
  }
  return resolve.drinks;
}

export async function fetchApiIngredientsList(food) {
  if (food) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    return result.meals;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const result = await response.json();
  return result.drinks;
}

export const makeFetch = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const checkLocalStorage = (id, ingredients, mealsOrDrink) => {
  let result = [...ingredients];
  if (localStorage.getItem('inProgressRecipes')) {
    let checkeds = [];
    switch (mealsOrDrink) {
    case 'meals':
      checkeds = JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id];
      break;
    case 'drink':
      checkeds = JSON.parse(localStorage.getItem('inProgressRecipes')).drinks[id];
      break;
    default:
      break;
    }
    if (!checkeds) {
      return result;
    }
    result = ingredients.map((e) => {
      if (checkeds.includes(e.str)) return { ...e, checked: true };
      return e;
    });
    return result;
  }
  return result;
};

export const makeListIngredients = (obj) => {
  const recipe = Object.values(obj)[0][0];
  const result = [];
  for (let i = 1; i < 100; i += 1) {
    if (recipe[`strIngredient${i}`]) {
      result.push(
        {
          str: `${recipe[`strMeasure${i}`]} ${recipe[`strIngredient${i}`]}`,
          checked: false,
        },
      );
    }
  }
  return result;
};

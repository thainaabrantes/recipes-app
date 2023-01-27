export const makeFetch = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const makeListIngredients = (obj) => {
  const recipe = Object.values(obj)[0][0];
  const result = [];
  for (let i = 1; i < 100; i += 1) {
    if (recipe[`strIngredient${i}`]) {
      result.push(`${recipe[`strMeasure${i}`]} ${recipe[`strIngredient${i}`]}`);
    }
  }
  return result;
};

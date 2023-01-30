import { useState, useEffect } from 'react';
import useRecipeAPI from './useRecipeAPi';

function useLocalStorage() {
  const { recipes } = useRecipeAPI();
  const { recipe } = recipes;
  const [favorite, setFavorite] = useState(false);

  const handlerFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      const arr = [{
        id: recipe.idMeal || recipe.idDrink,
        type: Object.keys(recipe)[0].slice(2).toLowerCase(),
        nationality: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setFavorite(true);
      return;
    }
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites.some((x) => x.id === (recipe.idMeal || recipe.idDrink))) {
      favorites = favorites.filter((e) => e.id !== (recipe.idMeal || recipe.idDrink));
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setFavorite(false);
      return;
    }
    favorites.push({
      id: recipe.idMeal || recipe.idDrink,
      type: Object.keys(recipe)[0].slice(2).toLowerCase(),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setFavorite(true);
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') && recipe) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favorites.some(
        (x) => x.id === (recipe.idMeal || recipe.idDrink),
      );
      if (isFavorite) setFavorite(true);
    }
  }, [recipe]);
  return ({ handlerFavorite, favorite });
}

export default useLocalStorage;

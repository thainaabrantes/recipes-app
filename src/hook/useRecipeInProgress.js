/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { checkLocalStorage, makeFetch, makeListIngredients } from '../services';

const NUMBER_SIX = 6;

const useRecipeInProgress = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(null);
  const mealsOrDrink = pathname.slice(1, NUMBER_SIX);
  const [ingredients, setIngredients] = useState(null);

  const fetchRecipe = async () => {
    if (mealsOrDrink === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await makeFetch(url);
      setRecipe(data.meals[0]);
      setIngredients(checkLocalStorage(id, makeListIngredients(data), mealsOrDrink));
    } if (mealsOrDrink === 'drink') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await makeFetch(url);
      setRecipe(data.drinks[0]);
      setIngredients(checkLocalStorage(id, makeListIngredients(data), mealsOrDrink));
    }
  };

  const setLocalStorage = () => {
    if (!ingredients) {
      return;
    }
    const listIngredients = ingredients.filter((e) => e.checked).map((j) => j.str);
    if (localStorage.getItem('inProgressRecipes')) {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (mealsOrDrink === 'meals') {
        local.meals[id] = listIngredients;
      } if (mealsOrDrink === 'drink') {
        local.drinks[id] = listIngredients;
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(local));
      return;
    }
    if (mealsOrDrink === 'meals') {
      const obj = {
        meals: {
          [id]: listIngredients,
        },
        drinks: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } if (mealsOrDrink === 'drink') {
      const obj = {
        meals: {},
        drinks: {
          [id]: listIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  };

  useEffect(() => {
    setLocalStorage();
  }, [ingredients]);

  const handlerClickChecked = ({ target }) => {
    setIngredients(ingredients.map((e) => {
      if (target.name === e.str) return { ...e, checked: !e.checked };
      return e;
    }));
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return {
    recipe,
    ingredients,
    handlerClickChecked,
  };
};

export default useRecipeInProgress;

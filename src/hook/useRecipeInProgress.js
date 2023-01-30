import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { checkLocalStorage, makeFetch, makeListIngredients } from '../services';

const copy = require('clipboard-copy');

const NUMBER_SIX = 6;

const useRecipeInProgress = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(null);
  const mealsOrDrink = pathname.slice(1, NUMBER_SIX);
  const [ingredients, setIngredients] = useState(null);
  const [alertCopy, setAlertCopy] = useState(null);
  const history = useHistory();

  const handlerClickFavorite = async () => {
    if (mealsOrDrink === 'meals') await copy(`http://localhost:3000/meals/${id}`);
    if (mealsOrDrink === 'drink') await copy(`http://localhost:3000/drinks/${id}`);
    setAlertCopy(true);
  };

  const handlerClickChecked = ({ target }) => {
    setIngredients(ingredients.map((e) => {
      if (target.name === e.str) return { ...e, checked: !e.checked };
      return e;
    }));
  };

  const isButtonFinishDisabled = () => {
    const result = ingredients.some((x) => !x.checked);
    return result;
  };

  useEffect(() => {
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
    setLocalStorage();
  }, [ingredients, mealsOrDrink, id]);

  useEffect(() => {
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
    fetchRecipe();
  }, [id, mealsOrDrink, setRecipe]);

  const handlerClickFinish = () => {
    if (recipe) {
      let tags = [];
      if (recipe.strTags) tags = [...recipe.strTags.split(',')];
      if (!localStorage.getItem('doneRecipes')) {
        const obj = [{
          id,
          type: Object.keys(recipe)[0].slice(2).toLowerCase(),
          nationality: recipe.strArea || '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal || recipe.strDrink,
          image: recipe.strMealThumb || recipe.strDrinkThumb,
          doneDate: new Date().toISOString(),
          tags,
        }];
        localStorage.setItem('doneRecipes', JSON.stringify(obj));
        history.push('/done-recipes');
        return;
      }
      const dones = JSON.parse(localStorage.getItem('doneRecipes'));
      const obj = {
        id,
        type: Object.keys(recipe)[0].slice(2).toLowerCase(),
        nationality: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
        doneDate: (new Date()).toISOString(),
        tags,
      };
      dones.push(obj);
      localStorage.setItem('doneRecipes', JSON.stringify(dones));
      history.push('/done-recipes');
    }
  };

  return {
    recipe,
    ingredients,
    handlerClickChecked,
    handlerClickFavorite,
    alertCopy,
    isButtonFinishDisabled,
    handlerClickFinish,
  };
};

export default useRecipeInProgress;

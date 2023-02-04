import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const copy = require('clipboard-copy');

function Recipe() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState({ recipe: '', id: '' });
  const [typeFood, setTypeFood] = useState(null);
  const [alertCopy, setAlertCopy] = useState(null);
  const pageId = location.pathname.match(/\d+$/)[0];
  const handlerClickCopy = async () => {
    if (typeFood === 'meals') await copy(`http://localhost:3000/meals/${pageId}`);
    if (typeFood === 'drinks') await copy(`http://localhost:3000/drinks/${pageId}`);
    setAlertCopy(true);
  };
  const ingCalc = () => {
    const { recipe } = recipes;
    const arrIngredients = [];
    Object.keys(recipe).forEach((key) => {
      if (key.includes('strIngredient') && recipe[key] !== ''
        && recipe[key] !== null) {
        const measureKey = key.replace('Ingredient', 'Measure');
        arrIngredients.push(`${recipe[key]} - ${recipe[measureKey]}`);
      }
    });
    return arrIngredients;
  };
  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        let response;
        let data;
        if (location.pathname.includes('/meals')) {
          response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pageId}`);
          data = await response.json();
          setRecipes({ recipe: data.meals[0], id: pageId });
          setIsLoading(false);
          setTypeFood('meals');
        } else {
          response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pageId}`);
          data = await response.json();
          setRecipes({ recipe: data.drinks[0], id: pageId });
          setIsLoading(false);
          setTypeFood('drinks');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, [pageId, location.pathname]);
  return ({ recipes, isLoading, typeFood, pageId, alertCopy, handlerClickCopy, ingCalc });
}

export default Recipe;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Recipe() {
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const pageId = location.pathname.match(/\d+$/)[0];
  console.log(recipe);

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        let response;
        let data;
        if (location.pathname.includes('/meals')) {
          response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pageId}`);
          data = await response.json();
          setRecipe(data.meals[0]);
        } else {
          response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pageId}`);
          data = await response.json();
          setRecipe(data.drinks[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [pageId, location.pathname]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }
}

export default Recipe;

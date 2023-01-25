import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';

function Recipes() {
  const endpoints = {
    '/meals': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    '/drinks': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  };
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const fetchRecipes = async () => {
    const NUMBER_12 = 12;
    try {
      const response = await fetch(endpoints[location.pathname]);
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals.slice(0, NUMBER_12));
      } else {
        setRecipes(data.drinks.slice(0, NUMBER_12));
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {recipes.map((recipe, index) => (
        <Card
          key={ recipe.idMeal || recipe.idDrink }
          index={ index }
          name={ recipe.strMeal || recipe.strDrink }
          image={ recipe.strMealThumb || recipe.strDrinkThumb }
        />
      ))}
      <Footer />
    </div>
  );
}

export default Recipes;

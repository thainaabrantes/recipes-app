/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBarContext from '../context/SearchBarContext';

const NUMBER_12 = 12;
const NUMBER_FIVE = 5;

function Recipes() {
  const endpoints = {
    '/meals': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    '/drinks': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  };
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const { searchRecipes } = useContext(SearchBarContext);

  const fetchCategories = async () => {
    if (location.pathname === '/meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const result = data.meals.map((d) => d.strCategory).slice(0, NUMBER_FIVE);
      setCategories(result);
    } if (location.pathname === '/drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const result = data.drinks.map((d) => d.strCategory).slice(0, NUMBER_FIVE);
      setCategories(result);
    }
  };

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoints[location.pathname]);
      const data = await response.json();
      fetchCategories();
      if (data.meals) {
        setRecipes(data.meals.slice(0, NUMBER_12));
      } else {
        setRecipes(data.drinks.slice(0, NUMBER_12));
      }
    } finally {
      setIsLoading(false);
      setIsFiltered(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handlerClick = async ({ target }) => {
    const categoryFiltered = target.innerText;
    if (isFiltered === false) {
      setIsLoading(true);
      if (location.pathname === '/meals') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFiltered}`);
        const data = await response.json();
        setRecipes(data.meals.slice(0, NUMBER_12));
      } if (location.pathname === '/drinks') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryFiltered}`);
        const data = await response.json();
        setRecipes(data.drinks.slice(0, NUMBER_12));
      }
      setIsFiltered(true);
      setIsLoading(false);
      return;
    }
    fetchRecipes();
  };

  useEffect(() => {
    const { results, type } = searchRecipes;

    if (results === null) {
      setRecipes([]);
    } else if (results[type] && results[type].length > 1) {
      setRecipes(results[type].slice(0, NUMBER_12));
    } else if (results[type] && results[type].length <= 1) {
      setRecipes(results[type]);
    }
  }, [searchRecipes]);

  const handlerClickAllRecipes = () => {
    fetchRecipes();
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header />
      <button
        onClick={ handlerClickAllRecipes }
        type="button"
        data-testid="All-category-filter"
      >
        All

      </button>
      {categories.map((categoria) => (
        <button
          onClick={ handlerClick }
          key={ categoria }
          type="button"
          data-testid={ `${categoria}-category-filter` }
        >
          { categoria }
        </button>
      ))}
      {recipes.map((recipe, index) => (
        <Card
          id={ recipe.idMeal || recipe.idDrink }
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

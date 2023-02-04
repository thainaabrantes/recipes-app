/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBarContext from '../context/SearchBarContext';
import Loading from '../components/Loading';
import imageMealsCategories from '../helpers/imageMealsCategories';
import imageDrinksCategories from '../helpers/imageDrinksCategories';
import '../css/Recipes.css';

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
  const [categories, setCategories] = useState({ cat: [], img: [] });
  const { searchRecipes } = useContext(SearchBarContext);

  const fetchCategories = async () => {
    if (location.pathname === '/meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const result = data.meals.map((d) => d.strCategory).slice(0, NUMBER_FIVE);
      setCategories({ cat: result, img: imageMealsCategories });
    } if (location.pathname === '/drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const result = data.drinks.map((d) => d.strCategory).slice(0, NUMBER_FIVE);
      setCategories({ cat: result, img: imageDrinksCategories });
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
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handlerClick = async ({ target }) => {
    const categoryFiltered = target.alt || target.innerText;
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
    setIsLoading(false);
  };

  useEffect(() => {
    const { results, type } = searchRecipes;

    if (results === null) {
      setRecipes([]);
    } else if (results[type] && results[type].length > 1) {
      setRecipes(results[type].slice(0, NUMBER_12));
    } else if (results[type] && results[type].length <= 1) {
      console.log('Single!');
    }
  }, [searchRecipes]);

  const handlerClickAllRecipes = () => {
    fetchRecipes();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="btn-container">
        <div className="btn-filter-container">
          <button
            onClick={ handlerClickAllRecipes }
            type="button"
            data-testid="All-category-filter"
            className="btn-filter"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/5393/5393437.png" alt="all.icon" />
            <p>All</p>
          </button>
          {categories.cat.map((categoria, index) => (
            <button
              onClick={ handlerClick }
              key={ index }
              type="button"
              data-testid={ `${categoria}-category-filter` }
              className="btn-filter"
            >
              <img
                src={ location.pathname === '/meals'
                  ? imageMealsCategories[index]
                  : imageDrinksCategories[index] }
                alt={ categoria }
              />
              <p>{ categoria }</p>
            </button>
          ))}
        </div>
      </div>
      <div className="recipes-container">
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
    </div>
  );
}

export default Recipes;

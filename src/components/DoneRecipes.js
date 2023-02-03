import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';
import mealNDrink from '../images/meal-n-drink.svg';
import food from '../images/food.svg';
import drinks from '../images/drinks.svg';
import '../css/done-recipes.css';
import BtnBackProfile from './BtnBackProfile';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [recipes, setRecipes] = useState(null);
  const [alertCopy, setAlertCopy] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const handlerClickFavorite = async (mealsOrDrink, id) => {
    if (mealsOrDrink === 'meal') await copy(`http://localhost:3000/meals/${id}`);
    if (mealsOrDrink === 'drink') await copy(`http://localhost:3000/drinks/${id}`);
    setAlertCopy(true);
  };

  const handlerMeal = () => {
    const base = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(base.filter((e) => e.type === 'meal'));
  };

  const handlerDrink = () => {
    const base = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(base.filter((e) => e.type === 'drink'));
  };

  const handlerAll = () => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  return (
    <div>
      <Header />
      <div className="done-recipe-page">
        <div className="buttons-container">
          <button
            className="botton-icon"
            onClick={ handlerAll }
            type="button"
            data-testid="filter-by-all-btn"
          >
            <img src={ mealNDrink } alt="Meal and drink" />
          </button>
          <button
            className="botton-icon btn-margin"
            onClick={ handlerMeal }
            data-testid="filter-by-meal-btn"
            type="button"
          >
            <img src={ food } alt="Meal" />
          </button>
          <button
            className="botton-icon"
            onClick={ handlerDrink }
            type="button"
            data-testid="filter-by-drink-btn"
          >
            <img src={ drinks } alt="Drink" />
          </button>
        </div>
        <BtnBackProfile />
        {alertCopy && <p className="alert-copy">Link copied!</p>}
        {recipes && recipes.map((e, i) => (
          <div className="card-done-recipe" key={ e.id }>
            <Link
              className="link"
              to={ `/${e.type}s/${e.id}` }
            >
              <img
                className="img-done-recipe"
                data-testid={ `${i}-horizontal-image` }
                src={ e.image }
                alt="imageRecipe"
              />
            </Link>
            <button
              className="share-icon"
              onClick={ () => handlerClickFavorite(e.type, e.id) }
              src={ shareIcon }
              data-testid={ `${i}-horizontal-share-btn` }
              type="button"
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            <div className="info-container">
              <Link
                className="link"
                to={ `/${e.type}s/${e.id}` }
              >
                <h3
                  className="done-recipe-name"
                  data-testid={ `${i}-horizontal-name` }
                >
                  { e.name }
                </h3>
              </Link>
              <h4
                className="done-recipe-info"
                data-testid={ `${i}-horizontal-top-text` }
              >
                { e.type === 'meal'
                  ? `${e.nationality} - ${e.category}` : e.alcoholicOrNot }
              </h4>
              <p
                className="done-date-recipe"
                data-testid={ `${i}-horizontal-done-date` }
              >
                { `Done in: ${e.doneDate}` }
              </p>
              {e.tags && e.tags.length > 0 && e.tags.map((t) => (
                <p
                  className="done-recipe-tag"
                  key={ t }
                  data-testid={ `${i}-${t}-horizontal-tag` }
                >
                  { t }
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;

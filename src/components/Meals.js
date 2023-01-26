import React from 'react';
import Header from './Header';
import mealIcon from '../images/mealIcon.svg';
import SearchBar from './SearchBar';
import Recipes from './Recipes';

function Meals() {
  return (
    <>
      <Header />
      <SearchBar />
      <div>
        <img src={ mealIcon } alt="Meal" />
        <h1 data-testid="page-title">Meals</h1>
      </div>
      <Recipes />
    </>
  );
}

export default Meals;

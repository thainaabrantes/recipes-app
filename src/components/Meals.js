import React from 'react';
import Header from './Header';
import mealIcon from '../images/mealIcon.svg';
import SearchBar from './SearchBar';

function Meals() {
  return (
    <div>
      <Header />
      <SearchBar />
      <img src={ mealIcon } alt="Meal" />
      <h1 data-testid="page-title">Meals</h1>
    </div>
  );
}

export default Meals;

import React from 'react';
import Header from './Header';
import drinkIcon from '../images/drinkIcon.svg';
import SearchBar from './SearchBar';
import Recipes from './Recipes';

function Drinks() {
  return (
    <>
      <Header />
      <SearchBar />
      <div>
        <img src={ drinkIcon } alt="Drink" />
        <h1 data-testid="page-title">Drinks</h1>
      </div>
      <Recipes />
    </>
  );
}

export default Drinks;

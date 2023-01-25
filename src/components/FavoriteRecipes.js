import React from 'react';
import Header from './Header';
import heartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <img src={ heartIcon } alt="Heart" />
      <h1 data-testid="page-title">Favorite Recipes</h1>
    </div>
  );
}

export default FavoriteRecipes;

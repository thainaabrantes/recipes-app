import React from 'react';
import '../css/BtnStartRecipe.css';

function BtnStartRecipe() {
  return (
    <button
      className="btnStart"
      type="button"
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default BtnStartRecipe;

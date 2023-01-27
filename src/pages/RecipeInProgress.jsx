import React from 'react';
import useRecipeInProgress from '../hook/useRecipeInProgress';

function RecipeInProgress() {
  const { recipe, ingredients } = useRecipeInProgress();

  return (
    <div>
      {recipe && (
        <>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt="foto-receita"
          />
          <h3 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h3>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
          {ingredients
          && ingredients.map((e, i) => (
            <label key={ e } data-testid={ `${i}-ingredient-step` } htmlFor={ e }>
              <input type="checkbox" name={ e } id={ e } />
              { e }
            </label>
          ))}
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;

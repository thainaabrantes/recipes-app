import React from 'react';
import '../css/recipeInProgress.css';
import useRecipeInProgress from '../hook/useRecipeInProgress';

function RecipeInProgress() {
  const { recipe, ingredients,
    handlerClickChecked, handlerClickFavorite,
    alertCopy, isButtonFinishDisabled } = useRecipeInProgress();

  return (
    <div>
      {alertCopy && <p>Link copied!</p>}
      {recipe && (
        <>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt="foto-receita"
          />
          <h3 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h3>
          <button
            onClick={ handlerClickFavorite }
            data-testid="share-btn"
            type="button"
          >
            Compartilhar

          </button>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
          {ingredients
          && ingredients.map((e, i) => (
            <label
              className={ `${e.checked && 'scratched'}` }
              key={ e.str }
              data-testid={ `${i}-ingredient-step` }
              htmlFor={ e.str }
            >
              <input
                onChange={ handlerClickChecked }
                checked={ e.checked }
                type="checkbox"
                name={ e.str }
                id={ e.str }
              />
              { e.str }
            </label>
          ))}
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <button
            disabled={ isButtonFinishDisabled() }
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar

          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;

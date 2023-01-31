import React, { useEffect, useState } from 'react';
import '../css/recipeInProgress.css';
import useRecipeInProgress from '../hook/useRecipeInProgress';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const { recipe, ingredients,
    handlerClickChecked, handlerClickFavorite,
    alertCopy, isButtonFinishDisabled, handlerClickFinish } = useRecipeInProgress();
  const [favorite, setFavorite] = useState(false);

  const handlerFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      const arr = [{
        id: recipe.idMeal || recipe.idDrink,
        type: Object.keys(recipe)[0].slice(2).toLowerCase(),
        nationality: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal || recipe.strDrink,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setFavorite(true);
      return;
    }
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites.some((x) => x.id === (recipe.idMeal || recipe.idDrink))) {
      favorites = favorites.filter((e) => e.id !== (recipe.idMeal || recipe.idDrink));
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setFavorite(false);
      return;
    }
    favorites.push({
      id: recipe.idMeal || recipe.idDrink,
      type: Object.keys(recipe)[0].slice(2).toLowerCase(),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setFavorite(true);
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') && recipe) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favorites.some(
        (x) => x.id === (recipe.idMeal || recipe.idDrink),
      );
      if (isFavorite) setFavorite(true);
    }
  }, [recipe]);

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
          <button
            onClick={ handlerClickFavorite }
            data-testid="share-btn"
            type="button"
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          {alertCopy && <p>Link copied!</p>}
          <button
            src={ favorite ? blackHeart : whiteHeart }
            onClick={ handlerFavorite }
            data-testid="favorite-btn"
            type="button"
          >
            { favorite ? (<img src={ blackHeart } alt="favoriteicon" />)
              : (<img src={ whiteHeart } alt="favoriteicon" />) }
          </button>
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
            onClick={ handlerClickFinish }
          >
            Finalizar
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;

import React, { useEffect, useState } from 'react';
import '../css/recipeInProgress.css';
import useRecipeInProgress from '../hook/useRecipeInProgress';
import blackHeart from '../images/blackHeartIcon.svg';
import mealicon from '../images/meal-icon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

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
    <div className="container-inprogress">
      {recipe && (
        <>
          <div className="primeiro-setor-foto">
            <img
              className="img-principal"
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt="foto-receita"
            />
            <div className="category-in-progress">
              <img src={ mealicon } alt="icon-cake" />
              {' '}
              <span data-testid="recipe-category">{recipe.strCategory}</span>
            </div>
            <h3
              className="recipe-title-progress"
              data-testid="recipe-title"
            >
              {recipe.strDrink || recipe.strMeal}
            </h3>
            <div className="botoes-in-progress">
              <button
                onClick={ handlerClickFavorite }
                data-testid="share-btn"
                type="button"
              >
                <img src={ shareIcon } alt="share icon" />
              </button>
              <button
                src={ favorite ? blackHeart : whiteHeart }
                onClick={ handlerFavorite }
                data-testid="favorite-btn"
                type="button"
              >
                { favorite ? (<img src={ blackHeart } alt="favoriteicon" />)
                  : (<img src={ whiteHeart } alt="favoriteicon" />) }
              </button>
            </div>
          </div>
          {alertCopy && <p className="alert">Link copied!</p>}
          <p className="title-inprogress">Ingredients</p>
          <div className="ingredients-in-progress">
            {ingredients
          && ingredients.map((e, i) => (
            <label
              className={ `itens-in-progress ${e.checked && 'scratched'}` }
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
                className="checkbox"
              />
              { e.str }
            </label>
          ))}
          </div>
          <p className="title-inprogress">Instructions</p>
          <div className="instructions">
            <p
              data-testid="instructions"
            >
              {recipe.strInstructions}
            </p>
          </div>
          <button
            className="finish-button-inprogress"
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

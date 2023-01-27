import React from 'react';
import { useLocation } from 'react-router-dom';
import Recipes2 from '../components/Recipes2';
import useRecipeAPI from '../hook/useRecipeAPi';
import useRecomendAPI from '../hook/useRecomendAPI';

function RecipeDetails() {
  const recipe = useRecipeAPI();
  const location = useLocation();
  const { recomendation } = useRecomendAPI();

  const ingredientsCalc = () => {
    const arrIngredients = [];

    Object.keys(recipe).forEach((key) => {
      if (key.includes('strIngredient') && recipe[key] !== '' && recipe[key] !== null) {
        const measureKey = key.replace('Ingredient', 'Measure');

        arrIngredients.push(`${recipe[key]} - ${recipe[measureKey]}`);
      }
    });
    return arrIngredients;
  };

  return (
    <>
      <div>
        {
          location.pathname.includes('/meals')
            ? (
              <div>
                <img
                  data-testid="recipe-photo"
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
                <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
                <h4>
                  Ingredientes:
                  <ul>
                    {
                      ingredientsCalc().map((ingredient, index) => (
                        <li
                          data-testid={ `${index}-ingredient-name-and-measure` }
                          key={ ingredient }
                        >
                          { ingredient }
                        </li>
                      ))
                    }
                  </ul>
                </h4>
                <h4> Instruções</h4>
                <p data-testid="instructions">{ recipe.strInstructions }</p>
                <iframe
                  data-testid="video"
                  title={ recipe.strMeal }
                  src={ recipe.strYoutube }
                  frameBorder="0"
                />
                {
                  recomendation === undefined
                    ? (
                      <p>Carregando...</p>
                    )
                    : (
                      <div>
                        {
                          recomendation.map((recom, index) => (
                            <div
                              key={ recom.idDrink }
                              data-testid={ `${index}-recommendation-card` }
                            >
                              <img src={ recom.strDrinkThumb } alt={ recom.strDrink } />
                              <h1
                                data-testid={ `${index}-recommendation-title` }
                              >
                                { recom.strDrink }
                              </h1>
                            </div>))
                        }
                      </div>
                    )
                }
              </div>
            )
            : (
              <div>
                <img
                  data-testid="recipe-photo"
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                />
                <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
                <div data-testid="recipe-category">
                  { `${recipe.strCategory}: ${recipe.strAlcoholic}` }

                </div>
                <h4>
                  Ingredientes:
                  <ul>
                    {
                      ingredientsCalc().map((ingredient, index) => (
                        <li
                          data-testid={ `${index}-ingredient-name-and-measure` }
                          key={ ingredient }
                        >
                          { ingredient }
                        </li>
                      ))
                    }
                  </ul>
                </h4>
                <h4> Instruções</h4>
                <p data-testid="instructions">{ recipe.strInstructions }</p>
                {
                  recomendation === undefined
                    ? (
                      <p>Carregando...</p>
                    )
                    : (
                      <div>
                        {
                          recomendation.map((recom, index) => (
                            <div
                              key={ recom.idMeal }
                              data-testid={ `${index}-recommendation-card` }
                            >
                              <img src={ recom.strMealThumb } alt={ recom.strMeal } />
                              <h1
                                data-testid={ `${index}-recommendation-title` }
                              >
                                { recom.strMeal }
                              </h1>
                            </div>))
                        }
                      </div>
                    )
                }
              </div>
            )
        }

      </div>
      <Recipes2 />
    </>
  );
}

export default RecipeDetails;

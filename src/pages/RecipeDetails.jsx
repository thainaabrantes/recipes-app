import { useLocation } from 'react-router-dom';
import useRecipeAPI from '../hook/useRecipeAPi';
import useRecomendAPI from '../hook/useRecomendAPI';

function RecipeDetails() {
  const recipe = useRecipeAPI();
  const location = useLocation();
  const recomendation = useRecomendAPI();

  console.log(recipe);

  const ingredientsCalc = () => {
    const arrIngredients = [];

    Object.keys(recipe).forEach((key) => {
      if (key.includes('strIngredient') && recipe[key] !== '') {
        const measureKey = key.replace('Ingredient', 'Measure');

        arrIngredients.push(`${recipe[key]} - ${recipe[measureKey]}`);
      }
    });
    return arrIngredients;
  };

  return (
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
                console.log(recomendation)
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
                console.log(recomendation)
              }
            </div>
          )
      }

    </div>
  );
}

export default RecipeDetails;

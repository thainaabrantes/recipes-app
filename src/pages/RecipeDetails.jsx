import React from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import useRecipeAPI from '../hook/useRecipeAPi';
import useRecomendAPI from '../hook/useRecomendAPI';
import BtnStartRecipe from '../components/BtnStartRecipe';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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
                <ul data-testid="ingredients-list">
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
              <BtnStartRecipe />
              {
                recomendation === undefined
                  ? (
                    <p>Carregando...</p>
                  )
                  : (
                    <Slider { ...settings }>
                      {
                        recomendation.map((recom, index) => (
                          <div
                            key={ recom.idDrink }
                            className="item"
                            data-testid={ `${recomendation
                              .indexOf(recomendation[index])}-recommendation-card` }
                          >
                            <img
                              src={ recom.strDrinkThumb }
                              alt={ recom.strDrink }
                              data-testid="carousel-image"
                            />
                            <h1
                              data-testid={ `${recomendation
                                .indexOf(recomendation[index])}-recommendation-title` }
                            >
                              { recom.strDrink }
                            </h1>
                          </div>))
                      }
                    </Slider>
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
                <ul data-testid="ingredients-list">
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
              <BtnStartRecipe />
              {
                recomendation === undefined
                  ? (
                    <p>Carregando...</p>
                  )
                  : (
                    <Slider { ...settings }>
                      {
                        recomendation.map((recom, index) => (
                          <div
                            key={ recom.idMeal }
                            className="item"
                            data-testid={ `${recomendation
                              .indexOf(recomendation[index])}-recommendation-card` }
                          >
                            <img
                              src={ recom.strMealThumb }
                              alt={ recom.strMeal }
                            />
                            <h1
                              data-testid={ `${recomendation
                                .indexOf(recomendation[index])}-recommendation-title` }
                            >
                              { recom.strMeal }
                            </h1>
                          </div>))
                      }
                    </Slider>
                  )
              }
            </div>
          )
      }

    </div>
  );
}

export default RecipeDetails;

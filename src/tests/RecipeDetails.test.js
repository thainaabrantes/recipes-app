import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
// import meals from '../../cypress/mocks/meals';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';

describe('Teste da tela de receitas em progresso', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const URL_MEALS = '/meals/52771';
  const URL_DRINKS = '/drinks/15997';

  it('Se os elementos aparecem na tela com Meal', async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));

      renderWithRouter(
        <RecipeDetails />,
        URL_MEALS,
      );
    });

    const photo = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const heading = screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
      level: 1,
    });
    const category = screen.getByRole('heading', {
      name: /vegetarian/i,
      level: 4,
    });
    const ingredients = screen.getByRole('heading', { name: /ingredientes: penne rigate - 1 pound olive oil - 1\/4 cup garlic - 3 cloves chopped tomatoes - 1 tin red chile flakes - 1\/2 teaspoon italian seasoning - 1\/2 teaspoon basil - 6 leaves parmigiano-reggiano - spinkling/i });
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');
    const btnStart = screen.getByTestId('start-recipe-btn');
    const btnShare = screen.getByTestId('share-btn');
    const btnFav = screen.getByTestId('favorite-btn');

    expect(photo && heading && category && ingredients && instructions
      && video && btnStart && btnShare && btnFav).toBeDefined();
  });

  it('Se o botão Favorite fuciona com Meal', async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));

      renderWithRouter(
        <RecipeDetails />,
        URL_MEALS,
      );
    });
    const btnFavBefore = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavBefore.src).toContain('http://localhost/whiteHeartIcon.svg');

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const btnFavAfter = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavAfter.src).toContain('http://localhost/blackHeartIcon.svg');

    const storage1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const meal = {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    };
    expect(storage1[0]).toEqual(meal);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const storage2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage2.length).toBe(0);
  });

  it('Se o botão Start Recipe fuciona com Meal', async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));
    });
    const { history } = renderWithRouter(
      <App />,
      URL_MEALS,
    );

    const btnStart = screen.getByRole('button', {
      name: /start recipe/i,
    });
    expect(btnStart).toBeDefined();

    act(() => {
      userEvent.click(btnStart);
    });

    expect(history.location.pathname).toEqual('/meals/52771/in-progress');
  });

  it('Se os elementos aparecem na tela com Drink', async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneDrinkId15997),
      }));

      renderWithRouter(
        <RecipeDetails />,
        URL_DRINKS,
      );
    });

    const photo = screen.getByRole('img', {
      name: /gg/i,
    });
    const heading = screen.getByRole('heading', {
      name: /gg/i,
      level: 1,
    });
    const category = screen.getByText(/ordinary drink: optional alcohol/i);
    const ingredients = screen.getByRole('heading', { name: /ingredientes: galliano - 2 1\/2 shots ginger ale - null ice - null/i });
    const instructions = screen.getByTestId('instructions');
    const btnStart = screen.getByTestId('start-recipe-btn');
    const btnShare = screen.getByTestId('share-btn');
    const btnFav = screen.getByTestId('favorite-btn');

    expect(photo && heading && category && ingredients && instructions
      && btnStart && btnShare && btnFav).toBeDefined();
  });

  it('Se o o carousel funciona', async () => {

  });
});

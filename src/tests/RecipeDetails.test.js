import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import mockFavorite from './mocks/mockFavorites';

const copy = require('clipboard-copy');

describe('Teste da tela de receitas em progresso', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const URL_MEALS = '/meals/52771';
  const URL_DRINKS = '/drinks/15997';
  const BLACK_HEART = 'http://localhost/blackHeartIcon.svg';
  const WHITE_HEART = 'http://localhost/whiteHeartIcon.svg';

  it('Se os elementos aparecem na tela com Meal', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    renderWithRouter(
      <RecipeDetails />,
      URL_MEALS,
    );

    const photo = await screen.findByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const heading = await screen.findByRole('heading', {
      name: /spicy arrabiata penne/i,
      level: 1,
    });
    const category = await screen.findByRole('heading', {
      name: /vegetarian/i,
      level: 4,
    });
    const ingredients = await screen.findByRole('heading', { name: /ingredientes: penne rigate - 1 pound olive oil - 1\/4 cup garlic - 3 cloves chopped tomatoes - 1 tin red chile flakes - 1\/2 teaspoon italian seasoning - 1\/2 teaspoon basil - 6 leaves parmigiano-reggiano - spinkling/i });
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const btnStart = await screen.findByTestId('start-recipe-btn');
    const btnShare = await screen.findByTestId('share-btn');
    const btnFav = await screen.findByTestId('favorite-btn');

    expect(photo && heading && category && ingredients && instructions
      && video && btnStart && btnShare && btnFav).toBeDefined();
  });

  it('Se o botão Share fuciona com Meal', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(
        (data) => { clipboardData = data; },
      ),
      readText: jest.fn(
        () => clipboardData,
      ),
    };
    global.navigator.clipboard = mockClipboard;

    renderWithRouter(
      <RecipeDetails />,
      URL_MEALS,
    );

    const btnshare = await screen.findByRole('img', { name: /share icon/i });

    expect(btnshare).toBeDefined();

    act(() => {
      userEvent.click(btnshare);
    });

    const copied = await screen.findByText(/link copied!/i);
    expect(copied).toBeDefined();

    copy();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });

  it('Se o botão Favorite fuciona com Meal e localStorage cheio', async () => {
    const answer = JSON.stringify(mockFavorite);
    localStorage.setItem('favoriteRecipes', answer);
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
    expect(btnFavBefore.src).toContain(BLACK_HEART);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toHaveLength(4);

    const btnFavAfter = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavAfter.src).toContain(WHITE_HEART);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const storage1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage1).toHaveLength(5);
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
    expect(btnFavBefore.src).toContain(WHITE_HEART);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const btnFavAfter = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavAfter.src).toContain(BLACK_HEART);

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

  it('Se o botão Favorite fuciona com Drink', async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneDrinkId15997),
      }));
      renderWithRouter(
        <RecipeDetails />,
        URL_DRINKS,
      );
    });

    const btnFavBefore = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavBefore.src).toContain(WHITE_HEART);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const btnFavAfter = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavAfter.src).toContain(BLACK_HEART);

    const storage1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const drink = {
      id: '15997',
      type: 'drink',
      nationality: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    };
    expect(storage1[0]).toEqual(drink);
    act(() => {
      userEvent.click(btnFavBefore);
    });

    const storage2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage2.length).toBe(0);
  });

  it('Se o botão Favorite fuciona com Drink e localStorage cheio', async () => {
    const answer = JSON.stringify(mockFavorite);
    localStorage.setItem('favoriteRecipes', answer);
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(oneDrinkId15997),
      }));
      renderWithRouter(
        <RecipeDetails />,
        URL_DRINKS,
      );
    });

    const btnFavBefore = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavBefore.src).toContain(BLACK_HEART);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toHaveLength(4);

    const btnFavAfter = screen.getByRole('img', {
      name: /favoriteicon/i,
    });
    expect(btnFavAfter.src).toContain(WHITE_HEART);

    act(() => {
      userEvent.click(btnFavBefore);
    });

    const storage1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage1).toHaveLength(5);
  });

  it('Se o botão Start Recipe redireciona em Meal', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
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

  it('Se o botão Start Recipe redireciona com Drink', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrinkId15997),
    }));
    const { history } = renderWithRouter(
      <App />,
      URL_DRINKS,
    );

    const btnStart = screen.getByRole('button', {
      name: /start recipe/i,
    });
    expect(btnStart).toBeDefined();

    act(() => {
      userEvent.click(btnStart);
    });

    expect(history.location.pathname).toEqual('/drinks/15997/in-progress');
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

  it('Se o carousel funciona em Meal', async () => {
    act(() => {
      global.fetch = jest.fn((url) => Promise.resolve({
        json: jest.fn()
          .mockResolvedValue(url.includes('/meals') ? oneMeal : drinks),
      }));

      renderWithRouter(
        <RecipeDetails />,
        URL_MEALS,
      );
    });

    const card0 = await screen.findByRole('img', {
      name: /gg/i,
    });
    const card1 = await screen.findByRole('img', {
      name: /a1/i,
    });
    expect(card0 && card1).toBeDefined();
  });

  it('Se o carousel funciona em Drink', async () => {
    await act(async () => {
      global.fetch = jest.fn((url) => Promise.resolve({
        json: jest.fn()
          .mockResolvedValue(url.includes('/drinks') ? oneDrinkId15997 : meals),
      }));

      renderWithRouter(
        <RecipeDetails />,
        URL_DRINKS,
      );
    });

    const card0 = screen.getByRole('img', {
      name: /corba/i,
    });
    const card1 = screen.getByRole('img', {
      name: /kumpir/i,
    });
    expect(card0 && card1).toBeDefined();
  });

  it('Se o botão Share fuciona com Drink', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrinkId15997),
    }));

    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(
        (data) => { clipboardData = data; },
      ),
      readText: jest.fn(
        () => clipboardData,
      ),
    };
    global.navigator.clipboard = mockClipboard;

    renderWithRouter(
      <RecipeDetails />,
      URL_DRINKS,
    );

    const btnshare = await screen.findByRole('img', { name: /share icon/i });

    expect(btnshare).toBeDefined();

    act(() => {
      userEvent.click(btnshare);
    });

    const copied = await screen.findByText(/link copied!/i);
    expect(copied).toBeDefined();

    copy();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
});

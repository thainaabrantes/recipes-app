import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneMeal from '../../cypress/mocks/oneMeal';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from './helpers/renderWithRouter';
import mockFavoriteRecipes from './mocks/mockLocalStorage';

const PROFILE = 'profile-top-btn';
const FILTER_ALL = 'filter-by-all-btn';
const FILTER_MEAL = 'filter-by-meal-btn';
const FILTER_DRINK = 'filter-by-drink-btn';
const FIRST_IMG = '0-horizontal-image';
const FIRST_NAME = '0-horizontal-name';
const FIRST_TEXT = '0-horizontal-top-text';
const NTH_SHARE = '-horizontal-share-btn';
const NTH_FAV = '-horizontal-favorite-btn';

const elements = [PROFILE, FILTER_ALL, FILTER_MEAL, FILTER_DRINK,
  FIRST_IMG, FIRST_NAME, FIRST_TEXT, `0${NTH_SHARE}`, `0${NTH_FAV}`];

describe('Local Storage:', () => {
  test('Start without localStorage', () => {
    renderWithRouter(
      <FavoriteRecipes />,
      '/favorite-recipes',
    );

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const list = screen.queryByTestId(`${FIRST_IMG}`);
    expect(list).not.toBeInTheDocument();
  });
});

describe('Favorite Recipes:', () => {
  beforeEach(() => {
    const answer = JSON.stringify(mockFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', answer);

    renderWithRouter(
      <FavoriteRecipes />,
      '/favorite-recipes',
    );
  });

  test('Verify elements', () => {
    elements.forEach((element) => {
      expect(screen.getByTestId(element)).toBeInTheDocument();
    });
  });

  test('Remove favorite', () => {
    const recipesLengthBefore = screen.getAllByRole('listitem');
    expect(recipesLengthBefore).toHaveLength(3);

    const thirdFav = screen.getByTestId(`0${NTH_FAV}`);
    userEvent.click(thirdFav);

    const recipesLengthAfter = screen.getAllByRole('listitem');
    expect(recipesLengthAfter).toHaveLength(2);
  });

  test('Use filter', () => {
    const mealFilter = screen.getByTestId(FILTER_MEAL);
    const ignoredDrink = screen.queryByRole('heading', { level: 2, name: 'Kir' });

    expect(ignoredDrink).toBeInTheDocument();

    userEvent.click(mealFilter);
    expect(ignoredDrink).not.toBeInTheDocument();
  });

  test('Share button', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFavoriteRecipes),
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

    const btnshare = await screen.findByTestId('0-horizontal-share-btn');

    expect(btnshare).toBeDefined();

    act(() => {
      userEvent.click(btnshare);
    });

    const copied = await screen.findByText(/Link copied!/i);
    expect(copied).toBeDefined();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
});

describe('Testa adc e rmv favoritos', () => {
  test('Add favorite', async () => {
    const URL_MEALS = '/meals/52771';

    const answer = JSON.stringify(mockFavoriteRecipes);
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

    act(() => {
      userEvent.click(btnFavBefore);
    });

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
    expect(storage1[3]).toEqual(meal);
    expect(storage1).toHaveLength(4);

    const btnFavAfter = screen.getByRole('img', {
      name: /favoriteicon/i,
    });

    act(() => {
      userEvent.click(btnFavAfter);
    });

    const storage2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage2.length).toBe(3);
  });
});

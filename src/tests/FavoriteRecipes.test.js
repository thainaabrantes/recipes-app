import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './helpers/renderWithRouter';
import mockFavoriteRecipes from './mocks/mockLocalStorage';
// import SearchBarProvider from '../context/SearchBarProvider';

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

beforeEach(() => {
  const answer = JSON.stringify(mockFavoriteRecipes);
  localStorage.setItem('favoriteRecipes', answer);

  renderWithRouter(
    <FavoriteRecipes />,
    '/favorite-recipes',
  );
});

describe('Up to 45%:', () => {
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
});

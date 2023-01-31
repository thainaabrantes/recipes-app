import { screen } from '@testing-library/react';

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
const FIRST_SHARE = '0-horizontal-share-btn';
const FIRST_FAV = '0-horizontal-favorite-btn';

const elements = [PROFILE, FILTER_ALL, FILTER_MEAL, FILTER_DRINK,
  FIRST_IMG, FIRST_NAME, FIRST_TEXT, FIRST_SHARE, FIRST_FAV];

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
});

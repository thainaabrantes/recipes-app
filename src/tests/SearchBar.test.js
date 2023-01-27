import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, within } from '@testing-library/react';

import renderWithRouterRoute from './helpers/renderWithRoutePathname';
import SearchBarProvider from '../context/SearchBarProvider';
import SearchBar from '../components/SearchBar';

const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'exec-search-btn';
const ISR = 'ingredient-search-radio';
const NSR = 'name-search-radio';
const LSR = 'first-letter-search-radio';

describe('Search Bar - Header: Meals', () => {
  beforeEach(async () => {
    await act(async () => {
      renderWithRouterRoute(
        <SearchBarProvider>
          <SearchBar />
        </SearchBarProvider>,
        '/meals',
      );
    });
  });

  test('Verify inputs', async () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(ISR);
    const nameRadio = screen.getByTestId(NSR);
    const letterRadio = screen.getByTestId(LSR);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  // test('', () => {});

  // global.fetch = jest.fn(() => Promise.resolve({
  //   json: () => Promise.resolve(mockIngredientChicken),
  // }));
});

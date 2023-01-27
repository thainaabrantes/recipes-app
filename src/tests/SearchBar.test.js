import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';

import renderWithRouterRoute from './helpers/renderWithRoutePathname';
import SearchBarProvider from '../context/SearchBarProvider';
import SearchBar from '../components/SearchBar';
import { mockNameAquamarine } from './mocks/mockDrinks';

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

  test('Verify meal request', async () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const letterRadio = screen.getByTestId(LSR);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockLetterN),
    }));

    userEvent.type(searchInput, 'n');
    userEvent.click(letterRadio);
    userEvent.click(searchButton);
  });
});

describe('Search Bar - Header: Drinks', () => {
  test('Verify drink request', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockNameAquamarine),
    }));

    const { history } = renderWithRouterRoute(
      <SearchBarProvider>
        <SearchBar />
      </SearchBarProvider>,
      '/drinks',
    );

    const { pathname: path1 } = history.location;

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NSR);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    expect(path1).toBe('/drinks');
    expect(searchButton).toBeDisabled();

    userEvent.type(searchInput, 'aquamarine');
    userEvent.click(nameRadio);
    expect(searchButton).toBeEnabled();

    await act(async () => {
      userEvent.click(searchButton);
    });

    const { pathname: path2 } = history.location;
    expect(path2).toBe('/drinks/178319');
  });
});

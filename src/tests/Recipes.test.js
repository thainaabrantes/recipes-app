import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';

import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import Recipes from '../pages/Recipes';

import beefMeals from '../../cypress/mocks/beefMeals';
import meals from '../../cypress/mocks/meals';

import { mockMealsCategories, mockDrinksCategories } from './mocks/mockCategories';
import { mockCategoryShake, mockNameAquamarine } from './mocks/mockDrinks';
import App from '../App';

const TOP_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'exec-search-btn';
const NSR = 'name-search-radio';
const LSR = 'first-letter-search-radio';

const ALL = 'All-category-filter';
const BEEF = 'Beef-category-filter';
const BREAKFAST = 'Breakfast-category-filter';
const CHICKEN = 'Chicken-category-filter';
const DESSERT = 'Dessert-category-filter';
const GOAT = 'Goat-category-filter';

const ORDINARY = 'Ordinary Drink-category-filter';
const COCKTAIL = 'Cocktail-category-filter';
const SHAKE = 'Shake-category-filter';
const OTHER = 'Other / Unknown-category-filter';
const COCOA = 'Cocoa-category-filter';

const mealCategories = [ALL, BEEF, BREAKFAST, CHICKEN, DESSERT, GOAT];
const drinkCategories = [ALL, ORDINARY, COCKTAIL, SHAKE, OTHER, COCOA];

describe('Recipes Meals:', () => {
  beforeEach(async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockMealsCategories),
      }));

      renderWithRouter(
        <SearchBarProvider>
          <Recipes />
        </SearchBarProvider>,
        '/meals',
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verify meals category buttons', async () => {
    mealCategories.forEach((category) => {
      const answer = screen.getByTestId(category);
      expect(answer).toBeInTheDocument();
    });
  });

  test('Verify Beef category', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));

    await act(async () => {
      userEvent.click(screen.getByTestId(BEEF));
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    await act(async () => {
      userEvent.click(await screen.findByRole('button', { name: /beef/i }));
    });

    expect(screen.getByText(/corba/i)).toBeInTheDocument();
  });

  test('Verify search with first letter', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsWithFirstLetterB),
    }));

    await act(async () => userEvent.click(await screen.findByTestId(TOP_BUTTON)));

    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'b');
    userEvent.click(screen.getByTestId(LSR));

    expect(screen.getByTestId(SEARCH_BUTTON)).toBeEnabled();

    await act(async () => userEvent.click(await screen.findByTestId(SEARCH_BUTTON)));

    expect(await screen.findByText(/bakewell tart/i)).toBeInTheDocument();
    expect(await screen.findByText(/bread and butter pudding/i)).toBeInTheDocument();
  });
});

describe('Recipes Drinks:', () => {
  beforeEach(async () => {
    await act(async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockDrinksCategories),
      }));

      renderWithRouter(
        <SearchBarProvider>
          <Recipes />
        </SearchBarProvider>,
        '/drinks',
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verify drinks category buttons', () => {
    drinkCategories.forEach((category) => {
      const answer = screen.getByTestId(category);
      expect(answer).toBeInTheDocument();
    });
  });

  test('Verify Shake category', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCategoryShake),
    });

    await act(async () => userEvent.click(screen.getByTestId(SHAKE)));

    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
    expect(screen.getByTestId('0-card-name')).toHaveTextContent('151 Florida Bushwacker');

    const images = screen.getAllByRole('button', { name: /Ver Receita/ });
    expect(images).toHaveLength(12);
  });
});

describe('Single and Null Responses:', () => {
  test('Request Aquamarine', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinksCategories),
    }));

    const { history } = renderWithRouter(
      <SearchBarProvider>
        <Recipes />
      </SearchBarProvider>,
      '/drinks',
    );

    const magnifyingGlass = await screen.findByTestId(TOP_BUTTON);
    await act(async () => userEvent.click(magnifyingGlass));

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockNameAquamarine),
    }));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NSR);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'aquamarine');
    userEvent.click(nameRadio);
    expect(searchButton).toBeEnabled();

    expect(history.location.pathname).toBe('/drinks');

    await act(async () => userEvent.click(searchButton));

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Login and Request some meal', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: jest.fn()
        .mockResolvedValue(meals),
    }));
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
    );

    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
    userEvent.type(screen.getByRole('textbox'), 'teste@teste.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), '1234567');
    expect(buttonEnter).toBeEnabled();
    userEvent.click(buttonEnter);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const lupa = await screen.findByRole('img', {
      name: /lupa/i,
    });
    act(() => userEvent.click(lupa));

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    const nameRadio = await screen.findByTestId(NSR);
    const searchButton = await screen.findByTestId(SEARCH_BUTTON);

    act(() => {
      userEvent.type(searchInput, 'kumpir');
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
    });

    const photo = await screen.findByRole('img', {
      name: /kumpir/i,
    });

    expect(photo).toBeDefined();
  });
});

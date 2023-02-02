import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Teste do Card', () => {
  it('Testar botoes do Card em Meal', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    const { history } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      '/meals',
    );

    const btn3 = await screen.findByTestId('2-recipe-card');
    act(() => {
      userEvent.click(btn3);
    });

    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/meals/52785');
  });

  it('Testar botoes do Card em Drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));

    const { history } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      '/drinks',
    );

    const btn3 = await screen.findByTestId('2-recipe-card');
    act(() => {
      userEvent.click(btn3);
    });

    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/drinks/13501');
  });
});

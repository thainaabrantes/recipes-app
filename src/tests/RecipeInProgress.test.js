import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';
import renderWithRouter from './helpers/renderWithRouter';
import mockFavoriteRecipes from './mocks/mockLocalStorage';

const ONE_FOOD = '/meals/52771/in-progress';
const ONE_DRINK = '/drinks/178319/in-progress';

describe('Teste da tela de receitas em progresso', () => {
  it('Se os elementos aparecem na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    await act(async () => {
      const { history } = renderWithRouter(
        <SearchBarProvider>
          <App />
        </SearchBarProvider>,
      );
      history.push(ONE_FOOD);
    });
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByText(/1 pound penne rigate/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/1 pound penne rigate/i));
  });
  it('Testar o botão favoritar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push(ONE_FOOD);
    });
    const buttonFavorite = screen.getByTestId('favorite-btn');
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    await act(async () => {
      history.push(ONE_DRINK);
    });
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
  });
  it('Testar o botão finalizar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push(ONE_DRINK);
    });
    userEvent.click(screen.getByText(/2 oz hpnotiq/i));
    userEvent.click(screen.getByText(/1 oz pineapple juice/i));
    userEvent.click(screen.getByText(/1 oz banana liqueur/i));
    expect(screen.getByRole('button', { name: /finalizar/i })).toBeEnabled();
  });
  it('Testar o botão favoritar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<App />);
    localStorage.removeItem('favoriteRecipes');
    await act(async () => {
      history.push(ONE_DRINK);
    });
    const buttonFavorite = screen.getByTestId('favorite-btn');
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
  });
  it('Share button', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    await act(async () => {
      const { history } = renderWithRouter(
        <SearchBarProvider>
          <App />
        </SearchBarProvider>,
      );
      history.push(ONE_FOOD);
    });

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

    const btnshare = await screen.findByTestId('share-btn');

    expect(btnshare).toBeDefined();

    act(() => {
      userEvent.click(btnshare);
    });

    const copied = await screen.findByText(/Link copied!/i);
    expect(copied).toBeDefined();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
  it('Testa localStorage favorito em Meal', async () => {
    const answer = JSON.stringify(mockFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', answer);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    await act(async () => {
      const { history } = renderWithRouter(
        <SearchBarProvider>
          <App />
        </SearchBarProvider>,
      );
      history.push(ONE_FOOD);
    });

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toHaveLength(3);

    const btnFav = await screen.findByRole('img', { name: /favoriteicon/i });

    act(() => {
      userEvent.click(btnFav);
    });

    const newStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newStorage).toHaveLength(4);
  });
  it('Testa finalizando um tarefa', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
    );
    history.push(ONE_FOOD);

    const checkbox = await screen.findAllByRole('checkbox');
    act(() => {
      checkbox.shift();
      checkbox.forEach((box) => userEvent.click(box));
    });

    const btnEnd = await screen.findByTestId('finish-recipe-btn');
    expect(btnEnd).toBeEnabled();

    act(() => {
      userEvent.click(btnEnd);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
});

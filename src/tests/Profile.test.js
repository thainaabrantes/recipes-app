import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';

describe('Teste da tela de Profile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const URL_PROFILE = '/profile';
  const SRC = '/static/media/profileIcon.44eb3608f431845fe2fc2d2a23d758ae.svg';
  const EMAIL = 'teste@teste.com';

  it('Testa a tela se a tela de Profile e seus elementos são renderizados', async () => {
    renderWithRouter(
      <App />,
      URL_PROFILE,
    );

    const heading = await screen.findByRole('heading', {
      name: /profile/i,
      level: 1,
    });
    const btnUSer = await screen.findByRole('img', {
      name: /usuário/i,
      src: SRC,
    });
    const btnDone = await screen.findByTestId('profile-done-btn');
    const btnFav = await screen.findByTestId('profile-favorite-btn');
    const btnLogout = await screen.findByTestId('profile-logout-btn');

    expect(heading && btnUSer && btnDone && btnFav && btnLogout).toBeDefined();
  });

  it('Testa se o email correto e renderizado na tela de Profile', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: jest.fn()
        .mockResolvedValue(meals),
    }));
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
    );

    const inputEmail = await screen.findByRole('textbox');
    const inputPass = await screen.findByPlaceholderText(/password/i);
    const btnEnter = await screen.findByTestId('login-submit-btn');
    expect(inputEmail && inputPass && btnEnter).toBeDefined();
    expect(btnEnter).toBeDisabled();

    act(() => {
      userEvent.type(inputEmail, EMAIL);
      userEvent.type(inputPass, '1234567');
    });
    expect(btnEnter).toBeEnabled();

    act(() => {
      userEvent.click(btnEnter);
    });

    const btnUSer = await screen.findByRole('img', {
      name: /usuário/i,
      src: SRC,
    });
    expect(btnUSer).toBeDefined();

    act(() => {
      userEvent.click(btnUSer);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    const email = await screen.findByTestId('profile-email');
    expect(email.innerHTML).toBe(EMAIL);
  });

  it('Testa se os botões funcionam corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: jest.fn()
        .mockResolvedValue(meals),
    }));
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
    );

    const inputEmail = await screen.findByRole('textbox');
    const inputPass = await screen.findByPlaceholderText(/password/i);
    const btnEnter = await screen.findByTestId('login-submit-btn');
    expect(inputEmail && inputPass && btnEnter).toBeDefined();
    expect(btnEnter).toBeDisabled();

    act(() => {
      userEvent.type(inputEmail, EMAIL);
      userEvent.type(inputPass, '1234567');
    });
    expect(btnEnter).toBeEnabled();

    act(() => {
      userEvent.click(btnEnter);
    });

    const btnUSer = await screen.findByRole('img', {
      name: /usuário/i,
      src: SRC,
    });
    expect(btnUSer).toBeDefined();

    act(() => {
      userEvent.click(btnUSer);
    });

    const email = await screen.findByTestId('profile-email');
    expect(email.innerHTML).toBe(EMAIL);

    const btnDone = await screen.findByTestId('profile-done-btn');

    act(() => {
      userEvent.click(btnDone);
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

    history.push('/profile');

    const btnFav = await screen.findByTestId('profile-favorite-btn');

    act(() => {
      userEvent.click(btnFav);
    });

    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/favorite-recipes');

    history.push('/profile');

    const btnLogout = await screen.findByTestId('profile-logout-btn');

    act(() => {
      userEvent.click(btnLogout);
    });

    const { pathname: pathname3 } = history.location;
    expect(pathname3).toBe('/');
  });
});

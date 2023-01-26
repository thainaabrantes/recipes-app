import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe('Teste do Header', () => {
  it('Testa se o Header tem o ícone de perfil', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
  });
  it('Testa se o Header tem o título "RECIPES app"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const titleHeader = screen.getByRole('heading', { name: /recipes app/i });
    expect(titleHeader).toBeInTheDocument();
  });
  it('Testa se o botão search aparece no Header, quando na rota /meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
  });
  it('Testa se o botão search aparece no Header, quando na rota /drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
  });
  // it('Testa se o botão search não aparece no Header, quando na rota /profile', () => {
  //   const { history } = renderWithRouter(<App />);
  //   act(() => {
  //     history.push('/profile');
  //   });
  //   const buttonSearch = screen.getByTestId('search-top-btn');
  //   expect(buttonSearch).not.toBeInTheDocument();
  // });
  it('Testa se ao clicar no icone de perfil a rota é redirecionada para /profile', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';
import Profile from '../components/Profile';

describe('Header requests:', () => {
  test('Profile redirect', () => {
    const { history } = renderWithRouter(<Header />, '/meals');
    const profileButton = screen.getByTestId('profile-top-btn');
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Start at Profile', () => {
    const { history } = renderWithRouter(<Profile />, '/profile');
    expect(history.location.pathname).toBe('/profile');
  });
});

// describe('Teste do Header', () => {
//   const testIdOfButtonSearch = 'search-top-btn';
//   // beforeEach(async () => {
//   //   global.fetch = jest.fn().mockResolvedValue({
//   //     json: jest.fn().mockResolvedValue(meals),
//   //   });
//   // });
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('Testa se o Header tem o ícone de perfil', async () => {
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/meals');
//     });
//     const profileIcon = await screen.findByTestId('profile-top-btn');
//     expect(profileIcon).toBeInTheDocument();
//   });
//   // it.only('Testa se o Header tem o título "RECIPES app"', async () => {
//   //   const { history } = renderWithRouter(<App />);
//   //   await act(async () => {
//   //     history.push('/meals');
//   //   });
//   //   const titleHeader = await screen.findByRole('heading', { name: /recipes app/i });
//   //   expect(titleHeader).toBeInTheDocument();
//   // });
//   it('Testa se o botão search aparece no Header, quando na rota /meals', async () => {
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/meals');
//     });
//     const buttonSearch = await screen.findByTestId(testIdOfButtonSearch);
//     expect(buttonSearch).toBeInTheDocument();
//   });
//   it('Testa se o botão search aparece no Header, quando na rota /drinks', async () => {
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/drinks');
//     });
//     const buttonSearch = await screen.findByTestId(testIdOfButtonSearch);
//     expect(buttonSearch).toBeInTheDocument();
//     userEvent.click(buttonSearch);
//   });
//   it('Testa se ao clicar no icone de perfil a rota é redirecionada para /profile', async () => {
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/meals');
//     });
//     const profileIcon = await screen.findByTestId('profile-top-btn');
//     expect(profileIcon).toBeInTheDocument();
//     userEvent.click(profileIcon);
//   });
//   it('Testa se ao clicar no icone search o input de pesquisa é mostrado', async () => {
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/meals');
//     });
//     const buttonSearch = await screen.findByTestId(testIdOfButtonSearch);
//     expect(buttonSearch).toBeInTheDocument();
//     userEvent.click(buttonSearch);
//     const searchInput = screen.getByTestId('search-input');
//     expect(searchInput).toBeInTheDocument();
//   });
// });

import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const local = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '2023-01-30T21:08:56.057Z',
    tags: [
      'Pasta',
      'Curry',
    ],
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '2023-01-31T18:10:04.329Z',
    tags: [],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '2023-01-31T18:34:15.444Z',
    tags: [],
  },
];

describe('Teste da tela de recipes terminados', () => {
  it('Testar se os elementos aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(local));
    await act(async () => {
      history.push('/done-recipes');
    });
    expect(history.location.pathname).toBe('/done-recipes');
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    window.document.execCommand = jest.fn(() => true);
    await act(async () => {
      userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    });
    await act(async () => {
      userEvent.click(screen.getByTestId('1-horizontal-share-btn'));
    });
  });
});

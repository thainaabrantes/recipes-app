import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Teste da pages /Recipes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Testar o filtro drink e all', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
    });
    expect(await screen.findByText(/gg/i)).toBeInTheDocument();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    });
    expect(await screen.findByRole('button', { name: /ordinary drink/i })).toBeInTheDocument();
    await act(async () => {
      userEvent.click(await screen.findByRole('button', { name: /ordinary drink/i }));
    });
    expect(screen.getByText(/410 gone/i)).toBeInTheDocument();
  });
});

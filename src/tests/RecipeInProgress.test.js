import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste da tela de receitas em progresso', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/52771/in-progress');
    });
  });
  it('Se os elementos aparecem na tela', async () => {
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
    expect(screen.getByRole('button', { name: /compartilhar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /vegetarian/i })).toBeInTheDocument();
    expect(screen.getByText(/1 pound penne rigate/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/1 pound penne rigate/i));
  });
  it('Testar o botão favoritar', async () => {
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('favorite-btn'));
  });
});

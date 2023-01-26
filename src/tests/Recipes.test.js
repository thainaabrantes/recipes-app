import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import beefMeals from '../../cypress/mocks/beefMeals';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste da pages /Recipes', () => {
  beforeEach(async () => {
    await act(async () => {
      renderWithRouter(<App />);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Testar o filtro Beef e all', async () => {
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
    userEvent.type(screen.getByRole('textbox'), 'teste@teste.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), '1234567');
    expect(buttonEnter).toBeEnabled();
    userEvent.click(buttonEnter);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });
    userEvent.click(await screen.findByRole('button', { name: /beef/i }));
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
    expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    await act(async () => {
      userEvent.click(await screen.findByRole('button', { name: /beef/i }));
    });
    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /all/i }));
    });
  });
});

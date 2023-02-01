import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste tela de login', () => {
  it('Testar se os inputs e o botão aparecem na tela', () => {
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
  });
});

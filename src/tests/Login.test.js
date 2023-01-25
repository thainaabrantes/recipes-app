import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Teste tela de login', () => {
  it('Testar se os inputs e o botão aparecem na tela', () => {
    const { history } = renderWithRouter(<App />);
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

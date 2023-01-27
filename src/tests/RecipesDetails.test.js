import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import App from '../App';

describe('Testa a pagina Recipe Details', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });
  it('Testa se renderiza a página da comida selecionada corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    const inputemail = await screen.findByTestId('email-input');
    const inputPassword = await screen.findByTestId('password-input');
    const buttonEnter = await screen.findByTestId('login-submit-btn');

    expect(inputemail && inputPassword && buttonEnter).toBeDefined();

    act(() => {
      userEvent.type(inputemail, 'teste@trybe.com');
      userEvent.type(inputPassword, '1234567');
      userEvent.click(buttonEnter);
    });

    act(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });

    const headingMeals = await screen.findByRole('heading', {
      name: /meals/i,
      lçevel: 1,
    });
    expect(headingMeals).toBeDefined();

    const btnCorbaFood = await screen.findByTestId('0-recipe-card');
    expect(btnCorbaFood).toBeDefined();

    act(() => {
      userEvent.click(btnCorbaFood);
    });

    act(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52977');
    });

    // ========== RecipesDetails ==========//

    const corbaPhoto = await screen.findByTestId('recipe-photo');
    const corbaTitle = await screen.findByTestId('recipe-title');
    const corbaCategory = await screen.findByTestId('recipe-category');
    const corbaInstructions = await screen.findByTestId('instructions');
    const corbaVideo = await screen.findByTestId('video');

    expect(corbaPhoto && corbaTitle && corbaCategory && corbaInstructions
      && corbaVideo).toBeDefined();

    // ========== Carousel ==========//
  });

  it('Testa se renderiza a página da bebida selecionada corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    const inputemail = await screen.findByTestId('email-input');
    const inputPassword = await screen.findByTestId('password-input');
    const buttonEnter = await screen.findByTestId('login-submit-btn');

    expect(inputemail && inputPassword && buttonEnter).toBeDefined();

    act(() => {
      userEvent.type(inputemail, 'teste@trybe.com');
      userEvent.type(inputPassword, '1234567');
      userEvent.click(buttonEnter);
    });

    act(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });

    const btnDrinks = await screen.findByRole('link', {
      name: /drinks icon/i,
    });

    console.log(btnDrinks);

    act(() => {
      userEvent.click(btnDrinks);
    });

    // screen.debug();
    act(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });

    // const btnA1Drink = await screen.findByTestId('1-recipe-card');
    // expect(btnA1Drink).toBeDefined();

    // ========== RecipesDetails ==========//

    // const a1Photo = await screen.findByTestId('recipe-photo');
    // const a1Title = await screen.findByTestId('recipe-title');
    // const a1Category = await screen.findByTestId('recipe-category');
    // const a1Instructions = await screen.findByTestId('instructions');

    // expect(a1Photo && a1Title && a1Category && a1Instructions).toBeDefined();

    // // ========== Carousel ==========//
  });
});

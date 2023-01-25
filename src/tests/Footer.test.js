import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Funcionamento Footer', () => {
  test('Se os elementos do footer existem', () => {
    render(<Footer />);
    const mealImg = screen.getByRole('img', {
      name: /meals icon/i,
    });

    expect(mealImg).toBeInTheDocument();

    const drinkImg = screen.getByRole('img', {
      name: /drinks icon/i,
    });

    expect(drinkImg).toBeInTheDocument();
  });
});

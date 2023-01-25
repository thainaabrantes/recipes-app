import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../css/Footer.css';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <a href="/meals">
        <img src={ mealIcon } alt="Meals icon" data-testid="meals-bottom-btn" />
      </a>
      <a href="/drinks">
        <img src={ drinkIcon } alt="Drinks icon" data-testid="drinks-bottom-btn" />
      </a>
    </div>
  );
}

export default Footer;

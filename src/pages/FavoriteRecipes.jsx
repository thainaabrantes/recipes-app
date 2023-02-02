import { useState, useEffect } from 'react';
import FavButtons from '../components/FavButtons';
import Header from '../components/Header';
import searchBlue from '../images/favorite-icon.svg';
import mealIcon from '../images/meal-icon.svg';
import drinkIcon from '../images/drink-icon.svg';
import '../css/FavoriteRecipes.css';

const categButtons = [
  { categ: 'all', label: 'All', src: searchBlue },
  { categ: 'meal', label: 'Meal', src: mealIcon },
  { categ: 'drink', label: 'Drink', src: drinkIcon },
];

function FavoriteRecipes() {
  const [receivedRecipes, setReceivedRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  const removeFavorite = (idRef) => {
    const answer = receivedRecipes.filter(({ id }) => id !== idRef);
    setReceivedRecipes(answer);
  };

  useEffect(() => {
    const answer = localStorage.getItem('favoriteRecipes');
    if (answer) setReceivedRecipes(JSON.parse(answer));
  }, []);

  useEffect(() => {
    const answer = JSON.stringify(receivedRecipes);
    localStorage.setItem('favoriteRecipes', answer);
  }, [receivedRecipes]);

  const filterButtons = (
    <div className="favoriteFilters">
      {categButtons.map(({ categ, label, src }) => (
        <div key={ categ }>
          <input
            src={ src }
            alt={ categ }
            type="image"
            onClick={ () => setFilter(categ) }
            data-testid={ `filter-by-${categ}-btn` }
          />
          <p>{label}</p>
        </div>
      ))}
    </div>
  );

  const elements = (
    <ul>
      {receivedRecipes
        .filter(({ type }) => {
          if (filter === 'all') return type;
          return type === filter;
        })
        .map(({
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        }, index) => {
          const URL = `http://localhost:3000/${type}s/${id}`;

          let text = alcoholicOrNot;
          if (type === 'meal') text = `${nationality} - ${category}`;

          return (
            <li key={ id }>
              <a href={ URL }>
                <img
                  style={ { width: '200px' } }
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
              </a>

              <p data-testid={ `${index}-horizontal-top-text` }>{text}</p>

              <FavButtons
                index={ index }
                URL={ URL }
                remove={ () => removeFavorite(id) }
              />
            </li>
          );
        })}
    </ul>
  );

  return (
    <>
      <Header />
      {filterButtons}
      {elements}
    </>
  );
}

export default FavoriteRecipes;

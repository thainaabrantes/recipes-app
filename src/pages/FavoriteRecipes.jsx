import { useState, useEffect } from 'react';
import FavButtons from '../components/FavButtons';
import Header from '../components/Header';
// import heartIcon from '../images/blackHeartIcon.svg';

const categButtons = [
  { title: 'All', categ: 'all' },
  { title: 'Meals', categ: 'meal' },
  { title: 'Drinks', categ: 'drink' },
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
    setReceivedRecipes(JSON.parse(answer));
  }, []);

  useEffect(() => {
    const answer = JSON.stringify(receivedRecipes);
    localStorage.setItem('favoriteRecipes', answer);
  }, [receivedRecipes]);

  const filterButtons = (
    <div>
      {categButtons.map(({ title, categ }) => (
        <button
          key={ categ }
          type="button"
          onClick={ () => setFilter(categ) }
          data-testid={ `filter-by-${categ}-btn` }
        >
          {title}
        </button>
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
          id, type, nationality, category, alcoholicOrNot, name, image,
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
      {/* <img src={ heartIcon } alt="Heart" /> */}
      <h1 data-testid="page-title">Favorite Recipes</h1>
      {filterButtons}
      {elements}
    </>
  );
}

export default FavoriteRecipes;

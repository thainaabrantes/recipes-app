import { useState, useEffect } from 'react';
import Header from '../components/Header';

const categButtons = [
  { title: 'All', categ: 'all' },
  { title: 'Meals', categ: 'meal' },
  { title: 'Drinks', categ: 'drink' },
];

function FavoriteRecipes() {
  const [receivedRecipes, setReceivedRecipes] = useState([]);

  useEffect(() => {
    setReceivedRecipes(localStorage.getItem('favoriteRecipes'));
  }, []);

  const clipboard = (src) => {
    Navigator.clipboard(src);
    global.alert('Link copied!');
  };

  const filterButtons = (
    <>
      {categButtons.map(({ title, categ }) => (
        <button
          key={ categ }
          type="button"
          data-testid={ `filter-by-${categ}-btn` }
        >
          {title}
        </button>
      ))}
    </>
  );

  const elements = (
    <>
      {receivedRecipes.map((receive, index) => {
        const { id, type, nationality, category, alcoholicOrNot, name, image } = receive;

        let text = alcoholicOrNot;
        if (type === 'meal') text = `${nationality} - ${category}`;

        return (
          <div key={ id }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />

            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <p data-testid={ `${index}-horizontal-top-text` }>{text}</p>

            <button
              type="button"
              onClick={ () => clipboard(image) }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share
            </button>

            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              Disfavorite
            </button>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <Header />
      <img src={ heartIcon } alt="Heart" />
      <h1 data-testid="page-title">Favorite Recipes</h1>
      {filterButtons}
      {elements}
    </>
  );
}

export default FavoriteRecipes;

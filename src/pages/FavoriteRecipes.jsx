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

  useEffect(() => {
    const answer = localStorage.getItem('favoriteRecipes');
    setReceivedRecipes(JSON.parse(answer));
  }, []);

  const filterButtons = (
    <div>
      {categButtons.map(({ title, categ }) => (
        <button
          key={ categ }
          type="button"
          data-testid={ `filter-by-${categ}-btn` }
        >
          {title}
        </button>
      ))}
    </div>
  );

  const elements = (
    <ul>
      {receivedRecipes.map((receive, index) => {
        const { id, type, nationality, category, alcoholicOrNot, name, image } = receive;
        const URL = `http://localhost:3000/${type}s/${id}`;

        let text = alcoholicOrNot;
        if (type === 'meal') text = `${nationality} - ${category}`;

        return (
          <li key={ id }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />

            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <p data-testid={ `${index}-horizontal-top-text` }>{text}</p>

            <FavButtons index={ index } URL={ URL } />
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

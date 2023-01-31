import { useState, useEffect } from 'react';
import Header from '../components/Header';
import heartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const categButtons = [
  { title: 'All', categ: 'all' },
  { title: 'Meals', categ: 'meal' },
  { title: 'Drinks', categ: 'drink' },
];

function FavoriteRecipes() {
  const [receivedRecipes, setReceivedRecipes] = useState([]);
  const [copied, setCopied] = useState({ is: false, from: 0 });

  useEffect(() => {
    const answer = localStorage.getItem('favoriteRecipes');
    setReceivedRecipes(JSON.parse(answer));
  }, []);

  const clipboard = (id, type, index) => {
    const link = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(link)
      .then(setCopied({ is: true, from: index }));
  };

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

            <input
              type="image"
              src={ shareIcon }
              alt="Share Icon"
              onClick={ () => clipboard(id, type, index) }
              data-testid={ `${index}-horizontal-share-btn` }
            />

            {copied.is && copied.from === index ? <p>Link copied!</p> : ''}

            <input
              type="image"
              src={ heartIcon }
              alt="Heart Icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </li>
        );
      })}
    </ul>
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

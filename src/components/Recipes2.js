import { useEffect, useState, useContext } from 'react';
import SearchBarContext from '../context/SearchBarContext';
import { TWELVE } from '../helpers/strings';

function Recipes() {
  const { recipes } = useContext(SearchBarContext);
  const [displayRecipes, setDisplayRecipes] = useState([]);

  useEffect(() => {
    const { results, type } = recipes;

    if (results === null) {
      setDisplayRecipes([]);
    } else if (results[type] && results[type].length > 1) {
      setDisplayRecipes(results[type]);
      console.log('A ALTERAR!');
    } else if (results[type] && results[type].length <= 1) {
      setDisplayRecipes(results[type]);
    }
  }, [recipes]);

  return (
    <>
      {displayRecipes.slice(0, TWELVE).map((recipe, index) => {
        const keyPiece = recipes.type === 'drinks' ? 'Drink' : 'Meal';
        const keyStr = `str${keyPiece}`;
        const keyThumb = `str${keyPiece}Thumb`;

        return (
          <div key={ recipe[keyThumb] } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe[keyThumb] }
              alt={ recipe[keyThumb] }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe[keyStr]}</p>
          </div>
        );
      })}
    </>
  );
}

export default Recipes;

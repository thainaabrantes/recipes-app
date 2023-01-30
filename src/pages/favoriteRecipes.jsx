const receivedRecipes = [{
  id: 'id',
  type: 'drink',
  alt: 'alt',
  src: 'src',
  name: 'name',
  nationality: 'nationality',
  alcoholicOrNot: true,
  category: 'category',
}];

const categButtons = [
  { title: 'All', categ: 'all' },
  { title: 'Meals', categ: 'meal' },
  { title: 'Drinks', categ: 'drink' },
];

function favoriteRecipes() {
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

        let text;
        if (type === 'meal') {
          text = `${nationality} - ${category}`;
        } else {
          text = alcoholicOrNot ? 'Alcoholic' : 'Non-alcoholic';
        }

        return (
          <div key={ id }>
            <img
              src={ image }
              alt={ `${name}` }
              data-testid={ `${index}-horizontal-image` }
            />

            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <p data-testid={ `${index}-horizontal-top-text` }>{text}</p>

            <button
              type="button"
              onClick={ () => clipboard(src) }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              {share}
            </button>

            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              {favorite}
            </button>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      {filterButtons}
      {elements}
    </>
  );
}

export default favoriteRecipes;

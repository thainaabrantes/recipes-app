const receivedRecipes = [{
  categ: 'drink',
  alt: 'alt',
  src: 'src',
  name: 'name',
  nationality: 'nationality',
  alcoholic: true,
  category: 'category',
  share: 'share',
  favorite: 'favorite',
}];

const categButtons = [
  { title: 'All', categ: 'all' },
  { title: 'Meals', categ: 'meal' },
  { title: 'Drinks', categ: 'drink' },
];

function favoriteRecipes() {
  const defineCateg = (categ) => {
    switch (categ) {
    case 'meal':
      return `${nationality} - ${category}`;
    case 'drink':
    default:
    }
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
        const {
          categ,
          alt,
          src,
          name,
          nationality,
          alcoholic,
          category,
          share,
          favorite,
        } = receive;

        let text;
        if (categ === 'meal') {
          text = `${nationality} - ${category}`;
        } else {
          text = alcoholic ? 'Alcoholic' : 'Non-alcoholic';
        }

        return (
          <div key={ src }>
            <img src={ src } alt={ alt } data-testid={ `${index}-horizontal-image` } />
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            <p data-testid={ `${index}-horizontal-top-text` }>{text}</p>
            <button data-testid={ `${index}-horizontal-share-btn` }>{share}</button>
            <button data-testid={ `${index}-horizontal-favorite-btn` }>{favorite}</button>
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

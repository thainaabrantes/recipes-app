const receivedRecipes = [{
  alt: 'alt',
  src: 'src',
  text: 'text',
  name: 'name',
  share: 'share',
  favorite: 'favorite',
}];

const categButtons = [
  { title: 'All', categ: 'all' },
  { title: 'Meals', categ: 'meal' },
  { title: 'Drinks', categ: 'drink' },
];

function favoriteRecipes() {
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
      {receivedRecipes.map(({ alt, src, text, name, share, favorite }, index) => (
        <div key={ src }>
          <img src={ src } alt={ alt } data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>{text}</p>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <button data-testid={ `${index}-horizontal-share-btn` }>{share}</button>
          <button data-testid={ `${index}-horizontal-favorite-btn` }>{favorite}</button>
        </div>
      ))}
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

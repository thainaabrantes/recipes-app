import propTypes from 'prop-types';
import { useState } from 'react';

import heartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavButtons({ index, URL }) {
  const [copied, setCopied] = useState(false);

  const clipboard = () => {
    const TIME = 5000;

    navigator.clipboard.writeText(URL);
    setCopied(true);
    setTimeout(() => setCopied(false), TIME);
  };

  return (
    <>
      <input
        type="image"
        src={ shareIcon }
        alt="Share Icon"
        onClick={ () => clipboard() }
        data-testid={ `${index}-horizontal-share-btn` }
      />

      {copied ? <p>Link copied!</p> : ''}

      <input
        type="image"
        src={ heartIcon }
        alt="Heart Icon"
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
    </>
  );
}

FavButtons.propTypes = {
  index: propTypes.string,
  URL: propTypes.string,
}.isRequired;

export default FavButtons;

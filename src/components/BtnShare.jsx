import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function BtnShare(props) {
  const { handlerClickFavorite } = props;

  return (
    <button
      type="button"
      onClick={ handlerClickFavorite }
      data-testid="share-btn"
    >
      Compartilhe
      <img src={ shareIcon } alt="share icon" />
    </button>
  );
}

BtnShare.propTypes = {}.isequired;

export default BtnShare;

import React from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import '../css/BtnFav.css';

function BtnFavorite(props) {
  const { handlerFavorite, favorite } = props;
  return (
    <button
      type="button"
      className="fav-btn"
      src={ favorite ? blackHeart : whiteHeart }
      onClick={ handlerFavorite }
      data-testid="favorite-btn"
    >
      { favorite ? (<img src={ blackHeart } alt="favoriteicon" />)
        : (<img src={ whiteHeart } alt="favoriteicon" />) }
    </button>
  );
}

BtnFavorite.propTypes = {}.isRequired;

export default BtnFavorite;

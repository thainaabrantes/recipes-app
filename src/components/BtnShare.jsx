import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function BtnShare(props) {
  const { handlerClickCopy } = props;

  return (
    <button
      type="button"
      onClick={ handlerClickCopy }
      data-testid="share-btn"
    >
      <img src={ shareIcon } alt="share icon" />
    </button>
  );
}

BtnShare.propTypes = {}.isequired;

export default BtnShare;

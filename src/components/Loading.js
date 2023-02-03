import React from 'react';
import '../css/loading.css';

function Loading() {
  return (
    <div className="charging-container">
      <p className="loading-text">Loading</p>
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;

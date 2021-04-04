import React from 'react';

const GameTile = () => {
  return (
    <>
      {[...Array(10)].map(() => {
        <div className='gt-wrapper'></div>;
      })}
    </>
  );
};

export default GameTile;

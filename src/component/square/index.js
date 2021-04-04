import React from 'react';
import PropTypes from 'prop-types';
import './square.scss';
import food from '../../images/food.svg';
import character from '../../images/charactertwo.svg';

const Square = ({ piece }) => {
  let imgPath, imgAlt;
  if (piece === 'character') {
    imgPath = character;
    imgAlt = 'character';
  } else if (piece === 'food') {
    imgPath = food;
    imgAlt = 'food';
  }
  return (
    <div className='square'>
      <div className='square-content'>
        {piece && <img src={imgPath} alt={imgAlt} />}
      </div>
    </div>
  );
};

Square.propTypes = {
  piece: PropTypes.oneOf(['character', 'food'])
};

export default Square;

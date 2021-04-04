import React from 'react';
import { useHistory } from 'react-router-dom';
import './startpage.scss';
import VectorTile from '../common/VectorTile';
import vector from '../../images/character.svg';
import GridButton from '../GridButton/GridButton';

const StartPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/board');
  };
  return (
    <div className='stg-wrapper'>
      <div className='stg-inner-wrapper'>
        <div className='stg-col-one'>
          <VectorTile />
        </div>
        <div className='stg-col-two'>
          <div className='stg-character'>
            <img src={vector} alt='' />
          </div>
          <h2>Greedy hunter</h2>
          <h3>The aim is to eat all the food in record time </h3>
          <h3>configure your game grid below</h3>
          <GridButton />
          <div className='stg-btn'>
            <button onClick={handleClick}>Start game</button>
          </div>
        </div>
        <div className='stg-col-three'>
          <VectorTile />
        </div>
      </div>
    </div>
  );
};

export default StartPage;

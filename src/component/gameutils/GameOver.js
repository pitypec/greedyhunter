import React, { useContext } from 'react';

import vector from '../../images/character.svg';
import VectorTile from '../common/VectorTile';
import GridButton from '../GridButton/GridButton';
import { GlobalContext } from '../state/GlobalState';

const GameOver = () => {
  const state = useContext(GlobalContext);
  const [TimeSpent] = state.timeSpent;
  const [finalFoodscaptured] = state.finalFoodscaptured;
  const [FinalFood] = state.finalFood;

  return (
    <>
      <div className='stg-wrapper'>
        <div className='stg-inner-wrapper'>
          <div className='stg-col-one'>
            <VectorTile />
          </div>
          <div className='stg-col-two'>
            <div className='stg-character'>
              <img src={vector} alt='' />
            </div>
            <h2>gameover!</h2>
            <h3>
              Total food: {finalFoodscaptured}/{FinalFood}
            </h3>
            <h3>Time spent: 00:{TimeSpent} </h3>
            <GridButton />
          </div>
          <div className='stg-col-three'>
            <VectorTile />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;

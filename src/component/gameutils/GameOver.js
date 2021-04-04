import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import vector from '../../images/character.svg';
import VectorTile from '../common/VectorTile';
import GridButton from '../GridButton/GridButton';
import { GlobalContext } from '../state/GlobalState';

const GameOver = () => {
  const state = useContext(GlobalContext);
  const history = useHistory();
  const [TimeSpent] = state.timeSpent;
  const [finalFoodscaptured] = state.finalFoodscaptured;
  const [FinalFood] = state.finalFood;

  const handleClick = () => {
    history.push('/board');
  };

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
            {finalFoodscaptured === FinalFood ? (
              <>
                <h2>Bravo</h2>
                <h3>Time spent: {TimeSpent ? TimeSpent : 0} seconds </h3>
              </>
            ) : (
              <>
                <h2>gameover!</h2>
                <h3>
                  Total food: {finalFoodscaptured}/{FinalFood ? FinalFood : 0}
                </h3>
                <h3>Time spent: {TimeSpent ? TimeSpent : 0} seconds </h3>
              </>
            )}

            <GridButton />
            <div className='stg-btn'>
              <button onClick={handleClick}>Start again</button>
            </div>
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

import React, { useContext, useEffect } from 'react';
import Board from '../board';
import { GlobalContext } from '../state/GlobalState';
import './gameplay.scss';
import liveLine from '../../images/live-line.svg';
import heart from '../../images/heart.svg';
import { useHistory } from 'react-router';

const GamePlay = () => {
  const state = useContext(GlobalContext);
  const history = useHistory();
  const [Grid] = state.Grid;
  const [numRows] = state.numRows;
  const [numCols] = state.numCols;
  const [Seconds] = state.Seconds;
  const [playerCol] = state.playerCol;
  const [playerRow] = state.playerRow;
  const [moves] = state.Moves;
  const [boardArray] = state.boardArray;
  const [gameOver] = state.gameOver;
  const [maxMoves] = state.maxMoves;

  useEffect(() => {
    if (gameOver) {
      history.push('/gameover');
    }
  }, [gameOver, history]);

  return (
    <div className='gp-main-wrapper'>
      <div className='gp-inner-wrapper'>
        <div className='gp-life-area'>
          <h2>
            Grid:{' '}
            <span>
              {Grid} x {Grid}
            </span>
          </h2>
          <img src={heart} alt='heart' className='heart' />
          <img src={liveLine} alt='live-line' className='live-line' />
          <h2>
            Time spent: <span>{Seconds} secs</span>
          </h2>
        </div>
        {numRows && numCols ? (
          <div id='grid'>
            <Board
              gameState={boardArray}
              playerCol={playerCol}
              playerRow={playerRow}
            />
          </div>
        ) : null}
        <div className='gp-bottom-area'>
          <h2>Maximum moves: {maxMoves}</h2>
          <h2>Total moves: {moves >= maxMoves ? maxMoves : moves}</h2>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;

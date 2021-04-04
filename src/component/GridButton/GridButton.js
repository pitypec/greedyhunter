import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import arrowup from '../../images/arrowup.svg';
import arrowdown from '../../images/arrowdown.svg';
import '../startPage/startpage.scss';
import { GlobalContext } from '../state/GlobalState';

const GridButton = () => {
  const state = useContext(GlobalContext);
  const [Min] = state.Min;
  const [Max] = state.Max;
  const [Grid, setGrid] = state.Grid;

  const history = useHistory();

  const handleChange = (e) => {
    const { value, max, min } = e.target;
    if (parseInt(value) < max && parseInt(value) > min) {
      setGrid(value);
    }
  };
  const increment = () => {
    if (Grid !== Max) {
      setGrid((prevstate) => prevstate + 1);
    }
  };
  const decrement = () => {
    if (Grid !== Min) {
      setGrid((prevstate) => prevstate - 1);
    }
  };
  const handleClick = () => {
    history.push('/board');
  };
  return (
    <>
      <div className='grid-input'>
        <h2>Game Grid</h2>
        <input
          onChange={handleChange}
          value={Grid}
          type='number'
          name='grid'
          id='grid'
          min='5'
          max='12'
        />
        <img
          src={arrowup}
          alt='increase'
          className='arrow-up'
          onClick={increment}
        />
        <img
          src={arrowdown}
          alt='decrease'
          className='arrow-down'
          onClick={decrement}
        />
      </div>
      <div className='stg-btn'>
        <button onClick={handleClick}>Start again</button>
      </div>
    </>
  );
};

export default GridButton;

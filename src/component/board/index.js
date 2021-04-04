import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Square from '../square';

const Board = ({ gameState, playerRow, playerCol }) => {
  const [pieces, setPieces] = useState([]);
  const [lPlayerRow, setLPlayerRow] = useState(playerRow);
  const [lPlayerCol, setLPlayerCol] = useState(playerCol);

  const initialGameState = useRef(gameState);
  useEffect(() => {
    // initialize the gameState
    setPieces(initialGameState.current);
  }, []);

  useEffect(() => {
    setLPlayerCol(playerCol);
    setLPlayerRow(playerRow);
  }, [playerRow, playerCol]);

  useEffect(() => {
    setPieces([...gameState]);
  }, [gameState]);

  return (
    <div className='board'>
      {pieces.length &&
        pieces.map((row, rowIndex) => {
          return (
            <div
              className='row'
              key={`row-${rowIndex}`}
              style={{ display: 'flex' }}
            >
              {row.map((elem, colIndex) => {
                // determine type of element to render in square
                let piece;

                // if the current position is the player position (takes precedence)
                if (lPlayerRow === rowIndex && lPlayerCol === colIndex) {
                  piece = 'character';
                } else if (elem && elem.unCaptured) {
                  // food object - only show when un-captured
                  piece = 'food';
                }

                return (
                  <div key={`row-${rowIndex}-col-${colIndex}`}>
                    <Square piece={piece} />
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

Board.propTypes = {
  boardArray: PropTypes.array
};

export default Board;

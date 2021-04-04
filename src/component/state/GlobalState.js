import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { buildArray } from '../utils/builders';

export const GlobalContext = createContext();
export const GlobalState = ({ children }) => {
  const [Grid, setGrid] = useState(5);
  const [Seconds, setSeconds] = useState(30);
  const [Max, setMax] = useState(12);
  const [Min, setMin] = useState(5);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [boardArray, setBoardArray] = useState();
  const [foods, setFoods] = useState(new Map());
  const [playerCol, setPlayerCol] = useState();
  const [playerRow, setPlayerRow] = useState();
  const [foodsCaptured, setFoodsCaptured] = useState(0);
  const [finalFoodscaptured, setFinalFoodscaptured] = useState(0);
  const [TimeSpent, setTimeSpent] = useState();
  const [moves, setMoves] = useState(0);
  const foodCount = useRef();
  const [maxMoves, setMaxMoves] = useState(100);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [FinalFood, setFinalFood] = useState();

  const handleGameReset = useCallback(() => {
    setNumCols(Grid);
    setNumRows(Grid);
    //place charcter in middle
    setPlayerCol(Math.floor(Grid / 2) - 1);
    setPlayerRow(Math.floor(Grid / 2) - 1);

    // build board array
    const arr = buildArray(Grid, Grid);
    setBoardArray([...arr.boardArray]);
    setFoods(arr.foodMap);
    foodCount.current = arr.foodMap.size;
    setMoves(0);
    setFoodsCaptured(0);
    setSeconds(30);
    setMax(12);
    setMin(5);
    setGameOver(false);
  }, [Grid]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (!gameOver) {
        if (Seconds === 0) {
          setGameOver(true);
        }
        if (Seconds > 0) {
          setSeconds(Seconds - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [Seconds, gameOver, resetGame]);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty('--template-row', Grid ? Grid : 5);
  }, [Grid]);
  // initialize game
  useEffect(() => {
    handleGameReset();
  }, [handleGameReset]);

  // reset game manually
  useEffect(() => {
    if (resetGame) {
      handleGameReset();
      setResetGame(false);
    }
  }, [handleGameReset, resetGame]);

  // handle player moves
  useEffect(() => {
    const increaseMoves = () => setMoves((prevMoves) => prevMoves + 1);
    const handlePlayerMove = (evt) => {
      // stop player movement when game is over
      if (gameOver) return;
      switch (evt.key) {
        case 'ArrowUp':
          if (playerRow > 0) {
            setPlayerRow(playerRow - 1);
            increaseMoves();
          }
          break;
        case 'ArrowDown':
          if (playerRow < numRows - 1) {
            setPlayerRow(playerRow + 1);
            increaseMoves();
          }
          break;
        case 'ArrowLeft':
          if (playerCol > 0) {
            setPlayerCol(playerCol - 1);
            increaseMoves();
          }
          break;
        case 'ArrowRight':
          if (playerCol < numCols - 1) {
            setPlayerCol(playerCol + 1);
            increaseMoves();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handlePlayerMove);
    return () => {
      window.removeEventListener('keydown', handlePlayerMove);
    };
  }, [playerRow, playerCol, numRows, numCols, gameOver]);

  // track mushroom states
  useEffect(() => {
    const checkFoodCaptured = (row, col) => {
      // if food exists at position
      const key = JSON.stringify({ row, col });
      if (foods.has(key)) {
        if (foods.get(key)['unCaptured']) {
          setBoardArray((prevArray) => {
            const prevRows = prevArray.slice(0, row);
            const postRows = prevArray.slice(row + 1);

            // make copy
            const oldRow = [...prevArray[row]];
            oldRow.splice(col, 1, { unCaptured: false });

            const newArray = [...prevRows, [...oldRow], ...postRows];
            return newArray;
          });

          setFoods(new Map(foods.set(key, false)));
          setFinalFood(foods.size);
          setFoodsCaptured((prevState) => prevState + 1);
          setFinalFoodscaptured(foodsCaptured);
        }
      }
    };

    checkFoodCaptured(playerRow, playerCol);
  }, [playerCol, playerRow, foods, foodsCaptured]);

  // track game status
  useEffect(() => {
    if (foodsCaptured >= foodCount.current) {
      setGameOver(true);
      setGrid(Grid);
      alert(`Congratulations you ate all the foods in ${moves} moves.`);
    }
  }, [Grid, foodsCaptured, moves]);

  useEffect(() => {
    if (moves >= maxMoves) {
      setMoves((prevState) => (prevState = 100));
      setGameOver(true);
      setGrid(Grid);
    }
  }, [Grid, maxMoves, moves]);

  const state = {
    Grid: [Grid, setGrid],
    boardArray: [boardArray, setBoardArray],
    playerCol: [playerCol, setPlayerCol],
    playerRow: [playerRow, setPlayerRow],
    Moves: [moves, setMoves],
    Seconds: [Seconds, setSeconds],
    numRows: [numRows, setNumRows],
    numCols: [numCols, setNumCols],
    maxMoves: [maxMoves, setMaxMoves],
    gameOver: [gameOver, setGameOver],
    startGame: [startGame, setStartGame],
    gameReset: [resetGame, setResetGame],
    foodsCaptured: [foodsCaptured, setFoodsCaptured],
    foods: [foods, setFoods],
    timeSpent: [TimeSpent, setTimeSpent],
    finalFoodscaptured: [finalFoodscaptured, setFinalFoodscaptured],
    finalFood: [FinalFood, setFinalFood],
    resetGame: [resetGame, setResetGame],
    Max: [Max, setMax],
    Min: [Min, setMin]
  };
  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};

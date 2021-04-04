const getRandomFoods = (rows, cols) => {
  const foodCount = Math.max(rows, cols);
  const foods = new Map();

  while (foods.size < foodCount) {
    const colCenter = Math.floor(cols / 2) - 1;
    const rowCenter = Math.floor(rows / 2) - 1;

    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);

    // avoid center for character
    if (col === colCenter && row === rowCenter) continue;

    foods.set(
      JSON.stringify({
        row,
        col
      }),
      { unCaptured: true }
    );
  }

  return foods;
};

export const buildArray = (numRows, numCols) => {
  const foodMap = getRandomFoods(numRows, numCols);
  const boardArray = [];
  for (let row = 0; row < numRows; row++) {
    boardArray[row] = [];
    for (let col = 0; col < numCols; col++) {
      if (foodMap.has(JSON.stringify({ row, col }))) {
        boardArray[row][col] = { unCaptured: true };
      } else {
        boardArray[row][col] = null;
      }
    }
  }

  return { boardArray, foodMap };
};

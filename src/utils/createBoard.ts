export type TileType = string | number;

interface PositionType {
  i: number;
  j: number;
}

const createNestedArray = <T>(row: number, col: number): T[][] => {
  let outerArray: T[][] = [];
  for (let i = 0; i < row; i++) {
    let innerArray: T[] = [];
    for (let j = 0; j < col; j++) {
      innerArray.push('' as unknown as T);
    }
    outerArray.push(innerArray);
  }
  return outerArray;
};

const populateNestedArray = <T>(
  arrayMap: T[][],
  position: PositionType,
  value: T
) => {
  const result = arrayMap;
  result[position.i][position.j] = value;
  return result;
};

function getMinePositions(
  row: number,
  col: number,
  numberOfMines: number
): PositionType[] {
  const positions: PositionType[] = [];

  while (positions.length < numberOfMines) {
    const position = {
      i: randomNumber(row),
      j: randomNumber(col),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

export const positionMatch = (a: PositionType, b: PositionType): boolean => {
  return a.i === b.i && a.j === b.j;
};

const randomNumber = (size: number) => {
  return Math.floor(Math.random() * size);
};

// compute nearby tile
const computeNearbyPosition = (board: TileType[][], position: PositionType) => {
  const positions: PositionType[] = [];
  const { i, j } = position;
  // not top and bottom row
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    if (board[a]) {
      for (let b of jList) {
        if (board[a][b] !== undefined && board[a][b] !== 'mine') {
          // set cell from null to 0
          if (typeof board[a][b] !== 'number') {
            board[a][b] = 0;
          }
          positions.push({ i: a, j: b });
        }
      }
    }
  }

  return positions;
};

// tileValue plus one
const tileValuePlusOne = (board: TileType[][], positions: PositionType[]) => {
  const newBoard = board;
  positions.forEach((position) => {
    const { i, j } = position;
    newBoard[i][j] = (board[i][j] as number) + 1;
  });
  return newBoard;
};

export const createBoard = (
  row: number,
  col: number,
  numberOfMines: number
): TileType[][] => {
  // create board matrix
  const board = createNestedArray<TileType>(row, col);
  // get mine positons in the form of [i,j]
  const minePositons = getMinePositions(row, col, numberOfMines);

  minePositons.forEach((minePositon) => {
    // populate mine position to board matrx
    populateNestedArray(board, minePositon, 'mine');
    // assign number to adjacent cell next to mine
    const numberPosition = computeNearbyPosition(board, minePositon);
    console.log(numberPosition);
    tileValuePlusOne(board, numberPosition);
  });

  return board;
};

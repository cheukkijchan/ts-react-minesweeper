interface PositionType {
  x: number;
  y: number;
}

export interface TileType {
  x: number;
  y: number;
  mine: boolean;
}

export function createBoard(boardSize: number, numberOfMines: number) {
  const board = [] as TileType[][];

  const minePositions = getMinePositions(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const currentRow = [] as TileType[];
    for (let y = 0; y < boardSize; y++) {
      const tile = {
        x,
        y,
        mine: !!minePositions.find((minePosition) => {
          return JSON.stringify(minePosition) === JSON.stringify({ x, y });
        }),
      };
      currentRow.push(tile);
    }

    board.push(currentRow);
  }

  return board;
}

export function getMinePositions(
  boardSize: number,
  numberOfMines: number
): PositionType[] {
  const positions: PositionType[] = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

export function positionMatch(a: PositionType, b: PositionType): boolean {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(size: number) {
  return Math.floor(Math.random() * size);
}

export function checkLose(position: PositionType, board: TileType[][]) {
  const { x, y } = position;
  if (board[x][y]) {
    return alert('You lose');
  }
}

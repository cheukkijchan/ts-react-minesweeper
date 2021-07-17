import { tileStatus } from '../components/TileContainer';

interface MinePositionType {
  x: number;
  y: number;
}

export interface TileType {
  x: number;
  y: number;
  mine: boolean;
}

export function createBoard(boardSize: number, numberOfMines: number) {
  const board: TileType[][] = [];
  const defaultBoardStatus: tileStatus[][] = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const currentRow = [] as TileType[];
    const statusRow = [] as tileStatus[];
    for (let y = 0; y < boardSize; y++) {
      const tile = {
        x,
        y,
        mine: !!minePositions.find((minePosition) => {
          return JSON.stringify(minePosition) === JSON.stringify({ x, y });
        }),
      };
      statusRow.push('hidden');
      currentRow.push(tile);
    }
    defaultBoardStatus.push(statusRow);
    board.push(currentRow);
  }

  return { board, defaultBoardStatus };
}

export function getMinePositions(
  boardSize: number,
  numberOfMines: number
): MinePositionType[] {
  const positions: MinePositionType[] = [];

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

export function positionMatch(
  a: MinePositionType,
  b: MinePositionType
): boolean {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(size: number) {
  return Math.floor(Math.random() * size);
}

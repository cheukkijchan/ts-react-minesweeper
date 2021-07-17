import React, { createContext } from 'react';
import { createBoard } from '../utils/logic';

import { Tile } from './Tile';

interface TileContainerProps {
  boardSize: number;
  numberOfMine: number;
}

export type tileStatus = 'hidden' | 'number' | 'marked' | 'mine';

export const BoardStatusContext = createContext([] as tileStatus[][]);

export const TileContainer: React.FC<TileContainerProps> = ({
  boardSize,
  numberOfMine,
}) => {
  // create board, board status and context api
  const { board, defaultBoardStatus } = createBoard(boardSize, numberOfMine);

  return (
    <div className='board'>
      <BoardStatusContext.Provider value={defaultBoardStatus}>
        {board.map((row, rowId) => {
          const x = row[rowId].x;
          return (
            <div className='row' key={rowId}>
              {row.map((col, colId) => {
                const position = { x, y: col.y };
                return <Tile key={colId} mine={col.mine} position={position} />;
              })}
            </div>
          );
        })}
      </BoardStatusContext.Provider>
    </div>
  );
};

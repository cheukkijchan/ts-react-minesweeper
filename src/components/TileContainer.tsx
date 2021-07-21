import React, { createContext } from 'react';

import { createBoard } from '../utils/createBoard';
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
  const board = createBoard(boardSize, boardSize, numberOfMine);
  return (
    <div className='board'>
      {board.map((row, rowId) => {
        return (
          <div className='row' key={rowId}>
            {row.map((col, colId) => {
              let value = JSON.stringify(col);
              if (typeof col === 'string') value = col;

              return <Tile key={colId} value={value}></Tile>;
            })}
          </div>
        );
      })}
    </div>
  );
};

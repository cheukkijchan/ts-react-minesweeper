import React, { useEffect, useState } from 'react';

import { createBoard, TileType } from '../utils/createBoard';
import { Tile } from './Tile';

interface TileContainerProps {
  boardSize: number;
  numberOfMine: number;
}

export const TileContainer: React.FC<TileContainerProps> = ({
  boardSize,
  numberOfMine,
}) => {
  const [clicksCount, setClicksCount] = useState<number>(1);
  const [board, setBoard] = useState<TileType[][]>([]);
  const [flag, setFlag] = useState<number>(0);

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    const board = createBoard(boardSize, boardSize, numberOfMine);
    console.log(board);
    setBoard(board);
    setClicksCount(1);
    setFlag(0);
  };

  const detectClick = () => {
    setClicksCount(clicksCount + 1);
    checkWin();
  };

  const checkWin = () => {
    const safeTiles = boardSize * boardSize - numberOfMine;
    if (clicksCount >= safeTiles) {
      setTimeout(() => {
        alert('you win');
      }, 100);
    }
  };

  const mineMarked = (value: number) => {
    setFlag(flag + value);
  };

  return (
    <div className='board'>
      Tile Marked: {flag}
      <button title='reset' onClick={setup} className='button'>
        Reset
      </button>
      <table>
        <tbody>
          {board.map((row, rowId) => (
            <tr key={rowId}>
              {row.map((col, colId) => {
                return (
                  <Tile
                    key={colId}
                    row={rowId}
                    col={colId}
                    board={board}
                    clickCount={detectClick}
                    onMark={mineMarked}
                  ></Tile>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

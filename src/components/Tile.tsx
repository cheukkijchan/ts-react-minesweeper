import React, { useEffect, useState } from 'react';
import { getNearbyPositions, TileType } from '../utils/createBoard';

interface TileProps {
  row: number;
  col: number;
  board: TileType[][];
  clickCount: () => void;
  onMark: (value: number) => void;
}

export type TileStatusType = 'hidden' | '🏁' | 'reveal' | '💣';

export const Tile: React.FC<TileProps> = ({
  row,
  col,
  board,
  clickCount,
  onMark,
}) => {
  const [tileStatus, setTileStatus] = useState<TileStatusType>('hidden');

  useEffect(() => {
    setTileStatus('hidden');
  }, [board]);

  // handle mark
  const handleMark = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    if (tileStatus === 'reveal') {
      return console.log('revealed');
    }
    // mark
    if (tileStatus !== '🏁') {
      setTileStatus('🏁');
      onMark(1);
    }
    // un-mark
    if (tileStatus === '🏁') {
      setTileStatus('hidden');
      onMark(-1);
    }
  };

  // reset Board
  // const setToHidden = () => {
  //   setTileStatus('hidden');
  // };

  // handle click
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    if (tileStatus === 'reveal') {
      return console.log('clicked');
    }

    if (tileStatus === 'hidden') {
      clickCount();
      // Mine Click
      if (board[row][col] === '💣') {
        setTileStatus('💣');
        setTimeout(() => {
          alert('you lose');
        }, 100);
      } else if (board[row][col] === '') {
        const nearbyTiles = getNearbyPositions(board, { i: row, j: col });
        nearbyTiles.forEach((tile) => {
          const target = document.getElementById(`${tile.i}_${tile.j}`);
          setImmediate(() => {
            if (target) {
              target?.click();
            }
          });
        });
        setTileStatus('reveal');
      } else {
        setTileStatus('reveal');
      }
    }
  };

  return (
    <td
      className={`tile ${tileStatus}`}
      style={{ border: '1px solid black' }}
      onContextMenu={handleMark}
      onClick={handleClick}
      id={`${row}_${col}`}
    >
      {tileStatus === 'hidden'
        ? ''
        : tileStatus === '🏁'
        ? tileStatus
        : board[row][col]}
    </td>
  );
};

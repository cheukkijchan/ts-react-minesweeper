import React, { useState } from 'react';
import { TileType } from '../utils/createBoard';
interface TileProps {
  value: TileType;
}

type tileStatus = 'hidden' | 'number' | 'marked' | 'mine';

export const Tile: React.FC<TileProps> = ({ value }) => {
  const [tileStatus, setTileStatus] = useState<tileStatus>('hidden');

  // handle click
  function handleMark(e: React.MouseEvent<Element, MouseEvent>) {
    e.preventDefault();
    // mark
    if (tileStatus !== 'marked') {
      setTileStatus('marked');
    }
    // un-mark
    if (tileStatus === 'marked') {
      setTileStatus('hidden');
    }
  }

  function checkMine(value: TileType) {
    if (value === 'mine') {
      setTileStatus('mine');
      setTimeout(() => {
        alert('you lose');
      }, 100);
    }
  }

  const handleReveal = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    checkMine(value);
  };

  return (
    <div
      className={`tile ${tileStatus}`}
      onContextMenu={handleMark}
      onClick={handleReveal}
    >
      {value}
    </div>
  );
};

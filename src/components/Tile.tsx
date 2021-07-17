import React, { useContext, useState } from 'react';
import { BoardStatusContext } from './TileContainer';

interface TileProps {
  mine: boolean;
  position: {
    x: number;
    y: number;
  };
}

type tileStatus = 'hidden' | 'number' | 'marked' | 'mine';

export const Tile: React.FC<TileProps> = ({ mine, position }) => {
  const context = useContext(BoardStatusContext);
  const { x, y } = position;
  const [tileStatue, setTileStatus] = useState<tileStatus>('hidden');

  // handle click
  function handleMark(e: React.MouseEvent<Element, MouseEvent>) {
    e.preventDefault();
    if (context[x][y] === 'hidden') {
      context[x][y] = 'marked';
      setTileStatus('marked');
    } else {
      context[x][y] = 'hidden';
      setTileStatus('hidden');
    }
  }

  const handleReveal = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    console.log(position);
  };

  return (
    <div
      className={`tile ${tileStatue}`}
      onContextMenu={handleMark}
      onClick={handleReveal}
    >
      {mine ? '1' : '0'}
    </div>
  );
};

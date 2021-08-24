import './App.css';
import { useState } from 'react';
import { TileContainer } from './components/TileContainer';

function App() {
  const [numberOfMine, setNumberOfMine] = useState(10);
  const [boardSize, setBoardSize] = useState(10);

  const mineChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setNumberOfMine(parseInt(e.currentTarget.value));
  };

  const boardChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setBoardSize(parseInt(e.currentTarget.value));
  };

  return (
    <div className='App'>
      <h3 className='title'>Mine Sweeper</h3>
      <form className='form'>
        <label>Number of Mine</label>
        <input
          onChange={mineChangeHandler}
          value={numberOfMine}
          type='number'
          min='0'
          max={boardSize * boardSize}
        />
        <label>Board Size</label>
        <input
          onChange={boardChangeHandler}
          value={boardSize}
          type='number'
          min='1'
          max='20'
        />
      </form>
      <TileContainer
        boardSize={boardSize}
        numberOfMine={numberOfMine}
      ></TileContainer>
    </div>
  );
}

export default App;

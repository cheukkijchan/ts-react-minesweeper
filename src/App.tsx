import './App.css';
import { TileContainer } from './components/TileContainer';

function App() {
  return (
    <div className='App'>
      <h3 className='title'>Mine Sweeper</h3>
      <div className='subtext'>Mines Left: 10</div>
      <TileContainer boardSize={10} numberOfMine={10}></TileContainer>
    </div>
  );
}

export default App;

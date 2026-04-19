import GameCanvas from "./components/GameCanvas";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <div className="game-card">
        <h1 className="game-title">Snake Game</h1>
        <p className="game-subtitle">Eat food. Grow longer. Don’t crash.</p>
        <GameCanvas />
      </div>
    </div>
  );
}

export default App;
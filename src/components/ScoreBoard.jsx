function ScoreBoard({ score, onRestart, isGameOver }) {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>

      {isGameOver && (
        <button className="restart-btn" onClick={onRestart}>
          ⟳ Restart
        </button>
      )}
    </div>
  );
}

export default ScoreBoard;
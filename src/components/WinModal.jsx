function WinModal({ moves, time, restart }) {
  return (
    <div className="modal">
      <h1>🎉 Congratulations!</h1>

      <h2>You Won</h2>

      <p>Moves : {moves}</p>

      <p>Time : {time} sec</p>

      <button onClick={restart}>Restart Game</button>
    </div>
  );
}

export default WinModal;

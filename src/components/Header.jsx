function Header({ moves, time }) {
  return (
    <div className="header">
      <h1>Memory Game</h1>

      <div>
        <h3>Moves : {moves}</h3>

        <h3>Time : {time}s</h3>
      </div>
    </div>
  );
}

export default Header;

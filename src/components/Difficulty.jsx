function Difficulty({ setDifficulty }) {
  return (
    <div className="difficulty">
      <button onClick={() => setDifficulty(8)}>Easy</button>

      <button onClick={() => setDifficulty(12)}>Medium</button>

      <button onClick={() => setDifficulty(18)}>Hard</button>
    </div>
  );
}

export default Difficulty;

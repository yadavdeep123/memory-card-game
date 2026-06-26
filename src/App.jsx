import { useState, useEffect } from "react";
import Card from "./components/Card";
import Difficulty from "./components/Difficulty";
import Header from "./components/Header";
import WinModal from "./components/WinModal";
import emojis from "./assets/cards";

function App() {
  const [difficulty, setDifficulty] = useState(8);

  const [cards, setCards] = useState([]);

  const [first, setFirst] = useState(null);

  const [second, setSecond] = useState(null);

  const [moves, setMoves] = useState(0);

  const [time, setTime] = useState(0);

  const [won, setWon] = useState(false);

  const [best, setBest] = useState(localStorage.getItem("bestScore") || "-");

  function generateCards() {
    let selected = emojis.slice(0, difficulty);

    let game = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,

        symbol: item,

        flipped: false,

        matched: false,
      }));

    setCards(game);

    setMoves(0);

    setTime(0);

    setWon(false);
  }

  useEffect(() => {
    generateCards();
  }, [difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function handleClick(card) {
    if (card.flipped || card.matched) return;

    let updated = [...cards];

    updated[card.id].flipped = true;

    setCards(updated);

    if (!first) {
      setFirst(card);
    } else {
      setSecond(card);

      setMoves((m) => m + 1);
    }
  }

  useEffect(() => {
    if (first && second) {
      if (first.symbol === second.symbol) {
        setCards((prev) =>
          prev.map((c) =>
            c.symbol === first.symbol ? { ...c, matched: true } : c,
          ),
        );

        reset();
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c,
            ),
          );

          reset();
        }, 800);
      }
    }
  }, [second]);

  function reset() {
    setFirst(null);

    setSecond(null);
  }

  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      setWon(true);

      if (best === "-" || moves < best) {
        localStorage.setItem("bestScore", moves);

        setBest(moves);
      }
    }
  }, [cards]);

  return (
    <div>
      <Header moves={moves} time={time} />

      <h3>Best Score : {best}</h3>

      <Difficulty setDifficulty={setDifficulty} />

      <div className="grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleClick(card)} />
        ))}
      </div>

      {won && <WinModal moves={moves} time={time} restart={generateCards} />}
    </div>
  );
}

export default App;

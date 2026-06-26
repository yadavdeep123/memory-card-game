import "./../App.css";

function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped || card.matched ? "flip" : ""}`}
      onClick={onClick}
    >
      <div className="front">❓</div>

      <div className="back">{card.symbol}</div>
    </div>
  );
}

export default Card;

import React from "react";

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`w-24 h-24 m-2 flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 ${
        card.isFlipped || card.isMatched
          ? "bg-blue-500 text-white"
          : "bg-gray-300"
      } rounded-lg shadow-md hover:shadow-lg`}
      onClick={onClick}
    >
      {card.isFlipped || card.isMatched ? card.emoji : "?"}
    </div>
  );
};

export default Card;

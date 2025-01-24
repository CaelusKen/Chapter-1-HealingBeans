export function generateCards() {
  const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
  const cards = [];

  for (let i = 0; i < emojis.length; i++) {
    cards.push({
      id: i * 2,
      emoji: emojis[i],
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: i * 2 + 1,
      emoji: emojis[i],
      isFlipped: false,
      isMatched: false,
    });
  }

  return shuffleCards(cards);
}

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

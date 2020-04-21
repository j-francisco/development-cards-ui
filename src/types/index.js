import PropTypes from "prop-types";

const { shape, number, string, arrayOf, bool } = PropTypes;

export const gameCardType = shape({
  id: number,
  played: bool,
  developmentCard: shape({
    cardType: string,
  }),
});

export const otherPlayerHandType = shape({
  playerId: number,
  playerName: string,
  cardsUnplayedCount: number,
  cardsPlayed: arrayOf(gameCardType),
});

export const gameType = shape({
  gameId: number,
  gameCode: string,
  availableCardCount: number,
  currentPlayerName: string,
  currentPlayerCards: arrayOf(gameCardType),
  otherPlayerHands: arrayOf(otherPlayerHandType),
});

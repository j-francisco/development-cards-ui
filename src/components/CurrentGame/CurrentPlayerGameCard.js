import React from "react";
import { useDispatch } from "react-redux";
import { getCardDisplayName } from "./gameUtils";
import CardButton from "./CardButton";
import PlayedCard from "./PlayedCard";
import { playCard } from "../../actions";
import { gameCardType } from "../../types";

const CurrentPlayerGameCard = ({ card }) => {
  const dispatch = useDispatch();

  const cardDisplayName = getCardDisplayName(card.developmentCard.cardType);

  if (card.played) {
    return <PlayedCard cardDisplayName={cardDisplayName} />;
  }

  const onClickPlayCard = (gameCardId) => {
    dispatch(playCard(gameCardId));
  };

  return (
    <CardButton outline color="primary" onClick={() => onClickPlayCard(card.id)}>
      {cardDisplayName}
    </CardButton>
  );
};

CurrentPlayerGameCard.propTypes = {
  card: gameCardType,
};

export default CurrentPlayerGameCard;

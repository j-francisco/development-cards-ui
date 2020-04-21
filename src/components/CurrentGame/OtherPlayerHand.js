import React from "react";
import { QuestionCircle } from "react-bootstrap-icons";
import { Alert } from "reactstrap";
import CardButton from "./CardButton";
import PlayedCard from "./PlayedCard";
import { otherPlayerHandType } from "../../types";
import { getCardDisplayName } from "./gameUtils";

const OtherPlayerHiddenCard = () => (
  <CardButton outline color="primary" disabled>
    <QuestionCircle fontSize="30" />
  </CardButton>
);

const OtherPlayerCards = ({ hand }) => {
  if (!hand.cardsPlayed.length && !hand.cardsUnplayedCount) {
    return (
      <Alert color="light" className="pl-0">
        No cards yet
      </Alert>
    );
  }

  return (
    <div>
      {Array.from(Array(hand.cardsUnplayedCount)).map((_, i) => (
        <OtherPlayerHiddenCard key={`Unplayed-${hand.playerId}-${i}`} />
      ))}

      {hand.cardsPlayed.map((card) => (
        <PlayedCard
          cardDisplayName={getCardDisplayName(card.developmentCard.cardType)}
          key={`Played-${hand.playerId}-${card.id}`}
        />
      ))}
    </div>
  );
};

const OtherPlayerHand = ({ hand }) => {
  return (
    <div className="mt-5">
      <h5>{hand.playerName}</h5>
      <OtherPlayerCards hand={hand} />
    </div>
  );
};

OtherPlayerHand.propTypes = {
  hand: otherPlayerHandType,
};

export default OtherPlayerHand;

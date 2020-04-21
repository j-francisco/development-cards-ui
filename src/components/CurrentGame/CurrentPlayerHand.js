import React from "react";
import { PlusCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { gameType } from "../../types";
import { pullCard } from "../../actions";
import BoldLabel from "../BoldLabel";
import CurrentPlayerGameCard from "./CurrentPlayerGameCard";
import ClickableCardButton from "./ClickableCardButton";

const CurrentPlayerHand = ({ game }) => {
  const dispatch = useDispatch();

  const onPullCard = () => {
    dispatch(pullCard());
  };

  return (
    <div>
      <div className="d-flex">
        <h5>{game.currentPlayerName}</h5>
        <div className="ml-auto">
          Cards In Deck: <BoldLabel>{game.availableCardCount}</BoldLabel>
        </div>
      </div>
      <div>
        {game.currentPlayerCards.map((card) => (
          <CurrentPlayerGameCard card={card} key={card.id} />
        ))}
        {game.availableCardCount > 0 && (
          <ClickableCardButton onClick={onPullCard}>
            <PlusCircle fontSize="30" />
          </ClickableCardButton>
        )}
      </div>
    </div>
  );
};

CurrentPlayerHand.propTypes = {
  game: gameType,
};

export default CurrentPlayerHand;

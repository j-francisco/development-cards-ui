import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionState } from "@microsoft/signalr";
import { Button, Alert } from "reactstrap";
import { gameType } from "../../types";
import { connectHubAction, disconnectHubAction, reconnectHubAction } from "../../actions";
import OtherPlayerHand from "./OtherPlayerHand";
import CurrentPlayerHand from "./CurrentPlayerHand";

const CurrentGame = (props) => {
  const { game } = props;
  const { gameId } = game;
  const dispatch = useDispatch();

  useEffect(() => {
    const setupSignalRConnection = (gameId) => {
      dispatch(connectHubAction(gameId));
    };

    const cleanupSignalRConnection = (gameId) => {
      dispatch(disconnectHubAction(gameId));
    };

    if (gameId) {
      setupSignalRConnection(gameId);
    }

    return () => {
      if (gameId) {
        cleanupSignalRConnection(gameId);
      }
    };
  }, [dispatch, gameId]);

  const connectionState = useSelector((state) => state.hubConnectionState);

  const doReconnect = () => {
    dispatch(reconnectHubAction());
  };

  let statusAlert = null;
  switch (connectionState) {
    case HubConnectionState.Connecting:
    case HubConnectionState.Reconnecting:
      statusAlert = <Alert>Connecting to game...</Alert>;
      break;
    case HubConnectionState.Disconnected:
      statusAlert = (
        <Alert>
          <Button color="link" className="p-0" onClick={doReconnect}>
            Click to refresh game
          </Button>
        </Alert>
      );
      break;
    default:
      statusAlert = null;
  }

  return (
    <div className="container-sm mt-4">
      {statusAlert}
      <CurrentPlayerHand game={game} />

      {game.otherPlayerHands.map((hand) => (
        <OtherPlayerHand hand={hand} key={hand.playerId} />
      ))}
    </div>
  );
};

CurrentGame.propTypes = {
  game: gameType.isRequired,
};

export default CurrentGame;

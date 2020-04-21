import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { setCurrentGameAction } from "../../actions";
import { gameType } from "../../types";
import { getPlayerToken } from "../../tokenUtils";
import OtherPlayerHand from "./OtherPlayerHand";
import CurrentPlayerHand from "./CurrentPlayerHand";

const CurrentGame = (props) => {
  const { game } = props;
  const dispatch = useDispatch();

  // TODO refactor this all into redux: https://github.com/butterngo/CSharpMessageQueue/tree/master/reactjs/my-app
  useEffect(() => {
    const setupSignalRConnection = async (gameId) => {
      const connection = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_HUB_URL)
        .withAutomaticReconnect()
        .build();

      connection.on("Message", (message) => {
        console.log("Message", message);
      });

      connection.on("ReceiveGame", (gameResponse) => {
        console.log("Received Game", gameResponse);
        dispatch(setCurrentGameAction(gameResponse));
      });

      try {
        await connection.start();
      } catch (err) {
        console.log("ERROR starting connection");
        console.log(err);
      }

      const playerToken = getPlayerToken();

      if (connection.state === HubConnectionState.Connected) {
        connection.invoke("SubscribeGame", { gameId, playerToken }).catch((err) => {
          return console.error(err.toString());
        });
      }

      return connection;
    };

    const cleanupSignalRConnection = async (gameId, connection) => {
      const playerToken = getPlayerToken();
      if (connection.state === HubConnectionState.Connected) {
        try {
          await connection.invoke("UnsubscribeGame", { gameId, playerToken });
        } catch (err) {
          return console.error(err.toString());
        }
      }

      connection.off("Message");
      connection.off("ReceiveGame");
      connection.stop();
    };

    let connection;
    if (game && game.gameId) {
      setupSignalRConnection(game.gameId).then((conn) => {
        connection = conn;
      });
    }

    return () => {
      if (game && game.gameId) {
        cleanupSignalRConnection(game.gameId, connection);
      }
    };
  }, [dispatch, game, game.gameId]);

  return (
    <div className="container-sm mt-4">
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

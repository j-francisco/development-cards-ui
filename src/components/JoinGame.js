import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { joinGame } from "../actions";
import BoldLabel from "./BoldLabel";
import StartContainer from "./StartContainer";

const StyledCodeInput = styled(Input)`
  text-transform: uppercase;
  ::-webkit-input-placeholder {
    text-transform: initial;
  }

  :-moz-placeholder {
    text-transform: initial;
  }

  ::-moz-placeholder {
    text-transform: initial;
  }

  :-ms-input-placeholder {
    text-transform: initial;
  }
`;

const Start = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onJoin = (e) => {
    e.preventDefault();
    dispatch(joinGame(gameCode, playerName, history));
  };

  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");

  const gameCodeInvalid = gameCode.trim().length !== 4;
  const joinDisabled = playerName.trim() === "" || gameCodeInvalid;

  const errorMessage = useSelector((state) => state.joinCreateError);

  const currentGame = useSelector((state) => state.currentGame);

  return (
    <StartContainer>
      <Form>
        <FormGroup>
          <BoldLabel for="code">Game Code </BoldLabel>
          <StyledCodeInput
            type="text"
            name="code"
            id="gameCode"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="Enter 4 letter game code"
            autoFocus
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <BoldLabel for="name">Name</BoldLabel>
          <Input
            type="text"
            name="name"
            id="playerName"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" size="lg" block onClick={onJoin} disabled={joinDisabled}>
          Join Game
        </Button>
      </Form>

      {errorMessage && (
        <Alert color="danger" className="mt-4">
          {errorMessage}
        </Alert>
      )}

      {currentGame && (
        <div>
          <hr />
          <Link to="/">Go to current game</Link>
        </div>
      )}
    </StartContainer>
  );
};

export default Start;

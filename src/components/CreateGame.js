import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createGame } from "../actions";
import BoldLabel from "./BoldLabel";
import StartContainer from "./StartContainer";

const Start = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onCreate = (e, val) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      dispatch(createGame(playerName, history));
    }
  };

  const [playerName, setPlayerName] = useState("");

  const buttonDisabled = playerName.trim() === "";

  const errorMessage = useSelector((state) => state.joinCreateError);

  const currentGame = useSelector((state) => state.currentGame);

  return (
    <StartContainer>
      <Form>
        <FormGroup>
          <BoldLabel for="name">Name</BoldLabel>
          <Input
            type="text"
            name="name"
            id="playerName"
            placeholder="Enter your name"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            autoFocus
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </FormGroup>
        <Button color="primary  " size="lg" block onClick={onCreate} disabled={buttonDisabled}>
          Create Game
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

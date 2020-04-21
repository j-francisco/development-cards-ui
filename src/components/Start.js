import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearJoinCreateError } from "../actions";
import StartContainer from "./StartContainer";

const Start = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onJoin = () => {
    dispatch(clearJoinCreateError());
    history.push("/join");
  };

  const onCreate = () => {
    dispatch(clearJoinCreateError());
    history.push("/create");
  };

  return (
    <StartContainer>
      <Button color="primary" size="lg" block onClick={onJoin}>
        Join Existing Game
      </Button>
      <Button color="info" size="lg" block onClick={onCreate}>
        Create New Game
      </Button>
    </StartContainer>
  );
};

export default Start;

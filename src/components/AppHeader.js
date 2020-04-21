import React from "react";
import styled from "styled-components";
import { Navbar, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { leaveGame, endGame } from "../actions";
import { gameType } from "../types";

const StyledNavbarNoGame = styled(Navbar)`
  &&& {
    color: #fff;
    justify-content: center;
  }
`;

const StyledNavbarInGame = styled(Navbar)`
  &&& {
    color: #fff;
    font-size: 0.8rem;
    padding-left: 0;
    padding-right: 0;
  }
`;

const NoGameHeader = () => (
  <StyledNavbarNoGame>
    <h3 className="mb-0">Catan DC</h3>
  </StyledNavbarNoGame>
);

const InGameHeader = ({ currentGame }) => {
  const dispatch = useDispatch();

  const onClickLeave = () => {
    dispatch(leaveGame(currentGame.gameCode));
  };

  const onClickEnd = () => {
    dispatch(endGame(currentGame.gameCode));
  };

  return (
    <StyledNavbarInGame>
      <div className="container-sm">
        <div>
          <div>Game Code:</div>
          <h5 className="mb-0">{currentGame.gameCode}</h5>
        </div>
        <div>
          <Button color="primary" size="sm" className="mr-2" onClick={onClickLeave}>
            Leave Game
          </Button>
          <Button color="info" size="sm" onClick={onClickEnd}>
            End Game
          </Button>
        </div>
      </div>
    </StyledNavbarInGame>
  );
};

InGameHeader.propTypes = {
  currentGame: gameType,
};

const Header = (props) => {
  const currentGame = useSelector((state) => state.currentGame);

  return currentGame ? <InGameHeader currentGame={currentGame} /> : <NoGameHeader />;
};

export default Header;

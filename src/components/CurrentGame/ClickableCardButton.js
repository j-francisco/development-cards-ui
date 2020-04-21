import React from "react";
import CardButton from "./CardButton";
import styled from "styled-components";

const StyledClickableCardButton = styled(CardButton)`
  &&&.btn-outline-primary:hover {
    color: #42a6c6;
    background-color: initial;
    border-color: #42a6c6;
  }

  @media (hover: hover) {
    &&&.btn-outline-primary:hover {
      color: #fff;
      background-color: #42a6c6;
      border-color: #42a6c6;
    }
  }
`;

export default function ClickableCardButton(props) {
  return <StyledClickableCardButton outline color="primary" {...props} />;
}

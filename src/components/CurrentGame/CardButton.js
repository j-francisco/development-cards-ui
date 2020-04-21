import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const StyledCardButton = styled(Button)`
  width: 85px;
  height: 90px;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 0.8rem;

  &:disabled {
    cursor: initial;
  }
`;

export default function CardButton(props) {
  return <StyledCardButton {...props} />;
}

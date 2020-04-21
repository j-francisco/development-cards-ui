import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  &&& {
    max-width: 600px;
  }
`;

export default function StartContainer(props) {
  return <StyledContainer className="container-md mt-4">{props.children}</StyledContainer>;
}

import React from "react";
import { Label } from "reactstrap";
import styled from "styled-components";

const StyledLabel = styled(Label)`
  font-weight: bold;
`;

export default function BoldLabel(props) {
  return <StyledLabel {...props} />;
}

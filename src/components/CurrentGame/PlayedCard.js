import React from "react";
import CardButton from "./CardButton";

export default function PlayedCard({ cardDisplayName }) {
  return (
    <CardButton outline color="info" disabled>
      {cardDisplayName}
    </CardButton>
  );
}

import React, { useState } from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css"
import { useFlip } from "./hooks";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, flipFacingUp] = useFlip(true);
  // const flipCard = () => {
  //   setIsFacingUp(isUp => !isUp);
  // };
  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={flipFacingUp}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;

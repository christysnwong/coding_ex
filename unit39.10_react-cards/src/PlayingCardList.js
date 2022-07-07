// import React, { useState } from "react";
// import { v4 as uuid } from "uuid";
// import axios from "axios";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import { useAxios } from "./hooks";
import {formatCard} from "./helpers";


/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  // method 1
  // const [cards, setCards] = useState([]);
  // const [resp, addRespData] = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");
  // const addCard = async () => {
  //   // const response = await axios.get(
  //   //   "https://deckofcardsapi.com/api/deck/new/draw/"
  //   // );
  //   let response = await addRespData("");
  //   setCards((cards) => [...cards, { ...response, id: uuid() }]);
  // };
  
  // method 2
  const [cards, addCard, removeCards] = useAxios(
    "cards", "https://deckofcardsapi.com/api/deck/new/draw/"
  );

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        {/* <button onClick={() => addCard(formatCard)}>Add a playing card!</button> */}
        <button onClick={() => addCard(formatCard)}>Add a playing card!</button>
        <button onClick={() => removeCards()}>Remove all cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((cardData) => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;

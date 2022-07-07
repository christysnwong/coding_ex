import {useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Cards.css"

const BASE_URL = 'http://deckofcardsapi.com/api/deck';


const Cards = () => {

  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]); 
  const [remaining, setRemaining] = useState(52);   

  const [autoDraw, setAutoDraw] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const timerId = useRef();

  const getDeckId = async () => {
    try {
      let resp = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      let deck_id = resp.data.deck_id;
      setDeckId(deck_id);
    } catch (err) {
      console.log(err);
    }
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
  };

  const startTimer = () => {
    timerId.current = setInterval(async () => {
      await drawCard();
    }, 1000);
  };

  const drawCard = async () => {
    try {
      
      let resp = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
      
      if (resp.data.remaining === 0) {
        if (autoDraw) {
          stopTimer();
        }

        setIsDrawing(false);
        alert("Error: no cards remaining!");

      }
      
      const newCardVal = `${resp.data.cards[0].suit} ${resp.data.cards[0].value}`;
      const newCardId = `${resp.data.cards[0].code}`;
      const newCardImg = resp.data.cards[0].image;

      setCards((cards) => [...cards, { id: newCardId, value: newCardVal, img: newCardImg }]);
      setRemaining(resp.data.remaining);
    } catch (err) {
      console.log(err);
    }
  };

  const restart = async () => {
    stopTimer();
    setIsDrawing(false);
    await getDeckId();
    setRemaining(52);
    setCards([]);
  }

  useEffect(() => {  
    getDeckId();
      
  }, []);

  useEffect(() => {

    if (autoDraw && isDrawing) {
      startTimer();
    }

    return () => {
      stopTimer();      
    }
  }, [autoDraw, isDrawing])
  
  

  return (
    <div>
      <h2>Card Draw</h2>
      <button onClick={() => setAutoDraw(!autoDraw)}>
        Autodraw-{autoDraw ? "ON" : "OFF"}
      </button>
      {!autoDraw && <button onClick={() => drawCard()}>Draw a card</button>}
      {autoDraw && (
        <button onClick={() => setIsDrawing(!isDrawing)}>
          {isDrawing ? "Stop" : "Start"} drawing
        </button>
      )}
      <button onClick={() => restart()}>Restart</button>

      <p>Cards Remaining: {remaining}</p>

      {cards.map((card) => (
        <div className="card" key={card.id}>
          <img className="cardImg" src={card.img} alt={card.value} />
        </div>
      ))}
    </div>
  );
}

export default Cards;
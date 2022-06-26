import React, { useState } from "react";
import "./EightBall.css";


const EightBall = ({answers=ans}) => {
 
    const [state, setState] = useState({msg: "Think of a Question", color: "black"});
    const randIdx = Math.floor(Math.random() * answers.length);
    const [countRed, setCountRed] = useState(0);
    const [countGreen, setCountGreen] = useState(0);
    const [countGoldenrod, setCountGoldenrod] = useState(0);

    const getAns = () => {
        setState(answers[randIdx]);
        
        // console.log("ball color: ", state.color);

        // 1st Method 
        // Issues - One click behind - i.e. color counts doesn't update right away
        // if (state.color === "red") {
        //     setCountRed(countRed + 1);
        // }
        
        // if (state.color === "green") {
        //     setCountGreen(countGreen + 1);
        // }
        
        // if (state.color === "goldenrod") {
        //     setCountGoldenrod(countGoldenrod + 1);
        // }

        // 2nd Method
        if (answers[randIdx].color === "red") {
          setCountRed(countRed + 1);
        }

        if (answers[randIdx].color === "green") {
          setCountGreen(countGreen + 1);
        }

        if (answers[randIdx].color === "goldenrod") {
          setCountGoldenrod(countGoldenrod + 1);
        }
        
    }

    const reset = () => {
        setState({ msg: "Think of a Question", color: "black" });
        setCountRed(0);
        setCountGreen(0);
        setCountGoldenrod(0);

    }
    
    return (
      <>
        <div
          className="EightBall"
          style={{ backgroundColor: state.color }}
          onClick={getAns}
        >
          {state.msg}
        </div>

        <div className="EightBall-content">
          <button onClick={reset}>Reset</button>
          <p>Red counts - {countRed}</p>
          <p>Green counts - {countGreen}</p>
          <p>Goldenrod counts - {countGoldenrod}</p>
        </div>
      </>
    );

}

const ans = [
  { msg: "It is certain.", color: "green" },
  { msg: "It is decidedly so.", color: "green" },
  { msg: "Without a doubt.", color: "green" },
  { msg: "Yes - definitely.", color: "green" },
  { msg: "You may rely on it.", color: "green" },
  { msg: "As I see it, yes.", color: "green" },
  { msg: "Most likely.", color: "green" },
  { msg: "Outlook good.", color: "green" },
  { msg: "Yes.", color: "green" },
  { msg: "Signs point to yes.", color: "goldenrod" },
  { msg: "Reply hazy, try again.", color: "goldenrod" },
  { msg: "Ask again later.", color: "goldenrod" },
  { msg: "Better not tell you now.", color: "goldenrod" },
  { msg: "Cannot predict now.", color: "goldenrod" },
  { msg: "Concentrate and ask again.", color: "goldenrod" },
  { msg: "Don't count on it.", color: "red" },
  { msg: "My reply is no.", color: "red" },
  { msg: "My sources say no.", color: "red" },
  { msg: "Outlook not so good.", color: "red" },
  { msg: "Very doubtful.", color: "red" },
];

export default EightBall;
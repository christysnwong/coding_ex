import React, { useState } from "react";
import Coin from "./Coin";

function CoinContainer(props) {

  // customize the # of coins, can set more than 1 coin
  let numCoins = 4;

  const [coins, setCoins] = useState([]);
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);

  const flipCoins = () => {
    let newCoins = [];

    for (let i = 0; i < numCoins; i++) {
      const randIdx = Math.floor(Math.random() * 2);
      let newCoin = props.coins[randIdx];

      if (newCoin.side === "head") {
        setHeadCount((headCount) => headCount + 1);
      } else {
        setTailCount((tailCount) => tailCount + 1);
      }

      newCoins.push(newCoin);
    }
    
    setCoins(newCoins);
    
  };

  const reset = () => {
    setCoins([]);
    setHeadCount(0);
    setTailCount(0);
  }
  

  return (
    <div className="CoinContainer">
      <h2>Let's flip coin(s)!</h2>

      {coins.map((c, idx) => (
        <Coin key={idx} side={c.side} src={c.src} />
      ))}

      <p>
        <button onClick={flipCoins}>Flip!</button>
        <button onClick={reset}>Reset</button>
      </p>
      <p>
        Out of {(headCount + tailCount) / numCoins} flip(s),
        there are {headCount} heads and {tailCount} tails.
      </p>
    </div>
  );
}

CoinContainer.defaultProps = {
  coins: [
    {
      side: "head",
      src: "https://www.coinsunlimited.ca/image/cache/wp/cp/data/decimal-coins-canada/rolls/2022/2022-canadian-1-dollar-common-loon-loonie-coin-2-800x800.webp",
    },
    {
      side: "tail",
      src: "https://www.coinsunlimited.ca/image/cache/wp/cp/data/decimal-coins-canada/rolls/2022/2022-canadian-1-dollar-common-loon-loonie-coin-1-800x800.webp",
    },
  ],
};

export default CoinContainer;
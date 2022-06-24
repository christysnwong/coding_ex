import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import { choice, remove } from "./helpers";
import fruits from "./foods";

const App = () => {
  
  let randFruit = choice(fruits);
  let remainedFruit = remove(fruits, randFruit);
  let fruitsLeft = remainedFruit.length;

  return (
    <>
      <p>I’d like one {randFruit}, please.</p>
      <p>Here you go: {randFruit}</p>
      <p>Delicious! May I have another?</p>
      <p>I’m sorry, we’re all out. We have {fruitsLeft} left.</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const store = Redux.createStore(rootReducer);

window.onload = function () {
  const moodElement = document.querySelector("h1");
  const bodyElement = document.querySelector("body");

  renderFace();
  // const initMood = store.getState().mood;
  // moodElement.innerText = initMood;

  document.querySelector("#happy").addEventListener("click", function () {
    store.dispatch({ type: "HAPPY" });
    // moodElement.innerText = store.getState().mood;
    // bodyElement.style.backgroundColor = store.getState().color;
  });

  document.querySelector("#sad").addEventListener("click", function () {
    store.dispatch({ type: "SAD" });
    // moodElement.innerText = store.getState().mood;
    // bodyElement.style.backgroundColor = store.getState().color;
  });

  document.querySelector("#angry").addEventListener("click", function () {
    store.dispatch({ type: "ANGRY" });
    // moodElement.innerText = store.getState().mood;
    // bodyElement.style.backgroundColor = store.getState().color;
  });

  document.querySelector("#confused").addEventListener("click", function () {
    store.dispatch({ type: "CONFUSED" });
    // moodElement.innerText = store.getState().mood;
    // bodyElement.style.backgroundColor = store.getState().color;
  });

  document.querySelector("#random").addEventListener("click", function () {
    let moodArr = ["HAPPY", "SAD", "ANGRY", "CONFUSED"];
    let randIdx = Math.floor(Math.random() * moodArr.length);

    store.dispatch({ type: moodArr[randIdx] });
    // moodElement.innerText = store.getState().mood;
    // bodyElement.style.backgroundColor = store.getState().color;
  });

  function renderFace() {
    moodElement.innerText = store.getState().mood;
    bodyElement.style.backgroundColor = store.getState().color;
  }

  // store.subscribe() registers listener callbacks 
  store.subscribe(renderFace);

};



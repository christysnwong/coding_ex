import './App.css';
import VendingMachine from './VendingMachine';

import Pocky from "./Pocky";
import HelloPanda from "./HelloPanda";
import YanYanStick from "./YanYanStick";
import NavBar from './NavBar';

import { BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/pocky">
          <Pocky />
        </Route>
        <Route exact path="/hellopanda">
          <HelloPanda />
        </Route>
        <Route exact path="/yanyanstick">
          <YanYanStick />
        </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;

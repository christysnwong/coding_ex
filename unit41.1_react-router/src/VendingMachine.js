import Pocky from "./Pocky";
import HelloPanda from "./HelloPanda";
import YanYanStick from "./YanYanStick";
import NavBar from "./NavBar";
import "./VendingMachine.css";

import { BrowserRouter, Route, Link, NavLink} from "react-router-dom";

const VendingMachine = () => {
  const imgURL = "https://i.etsystatic.com/11055180/r/il/2c0ff8/2992397599/il_fullxfull.2992397599_akdt.jpg";

    return (
      <div className="VendingMachine">
        <h1>Vending Machine</h1>
        <img src={imgURL} alt="vend-machine" />

        <nav>
          <NavLink exact to="/pocky">
            {`Pocky `}
          </NavLink>
          <NavLink exact to="/hellopanda">
            {`HelloPanda  `}
          </NavLink>
          <NavLink exact to="/yanyanstick">
            {`Yan Yan Stick `}
          </NavLink>
        </nav>
      </div>
    );
}

export default VendingMachine;
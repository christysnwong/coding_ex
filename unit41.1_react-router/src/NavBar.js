import { NavLink } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
    return (
      <nav className="NavBar">
        <NavLink exact to="/">
          {`Vending Machine `}
        </NavLink>
        <NavLink exact to="/HelloPanda">
          {`HelloPanda`}
        </NavLink>
        <NavLink exact to="/pocky">
          {`Pocky`}
        </NavLink>
        <NavLink exact to="/yanyanstick">
          {`Yan Yan Stick`}
        </NavLink>
      </nav>
    );


}

export default NavBar;
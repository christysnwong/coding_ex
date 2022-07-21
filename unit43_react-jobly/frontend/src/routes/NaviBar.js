import { useContext } from "react";
import UserContext from "../UserContext"
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem} from "reactstrap";

import "./NaviBar.css";

const NaviBar = ({ logout }) => {
    const {currUser} = useContext(UserContext)
    console.debug("Navibar - currUser", currUser);

    const userLinks = () => {
        return (
          <>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" onClick={logout}>Log out {currUser.username}</NavLink>
            </NavItem>
          </>
        );
    }

    const visitorLinks = () => {
        return (
          <>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
          </>
        );
    }


  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {currUser == null ? visitorLinks() : userLinks()}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NaviBar;

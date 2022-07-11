import { NavLink } from 'react-router-dom';
import "./Nav.css";

function Nav({dogs}) {
    return (
      <ul className="Nav">
        <li>
          <NavLink exact to={`/dogs`}>
            Home
          </NavLink>
        </li>

        {dogs.map((dog, idx) => (
          <li key={idx}>
            <NavLink exact to={`/dogs/${dog.name.toLowerCase()}`}>
              {dog.name}
            </NavLink>
          </li>
        ))}
      </ul>
    );
}

export default Nav;
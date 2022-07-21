import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
    const { currUser } = useContext(UserContext);
    let message = ""

    if (currUser) {
        message = `Welcome Back, ${currUser.firstName}`;
    }

    return (
      <div>
        <h2>Jobly</h2>
        <h6>All the jobs in one place!</h6>
        {currUser && <h4>{message}</h4>}
        {!currUser && (
          <p>
            <NavLink to="/login">Login</NavLink> | <NavLink to="/signup">Signup</NavLink>
          </p>
        )}
      </div>
    );
}

export default Home;
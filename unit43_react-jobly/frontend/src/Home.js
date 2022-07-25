import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./Home.css";

const Home = () => {
    const { currUser } = useContext(UserContext);

    return (
      <div className="Home">
        <div className="container text-center">
          <h1 className="mb-4 fw-bold">Jobly</h1>
          <p>All the jobs in one place!</p>
          {currUser && <h2>Welcome Back, {currUser.firstName}</h2>}
          {!currUser && (
            <p>
              <NavLink className="btn btn-primary fw-bold me-3" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-primary fw-bold" to="/signup">
                Signup
              </NavLink>
            </p>
          )}
        </div>
      </div>
    );
}

export default Home;
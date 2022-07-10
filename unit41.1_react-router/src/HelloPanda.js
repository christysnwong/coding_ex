import snacksList from "./snacksList";
import { NavLink } from "react-router-dom";

const HelloPanda = () => {
    let snack = "HelloPanda";
    let snacksImg = snacksList[snack].image;
  return (
    <div>
      <h1>Hello Panda Cookies</h1>
      <div>
        <NavLink exact to="/">
          Go Back
        </NavLink>
      </div>
      <img src={snacksImg} alt={snack} />

    </div>
  );
};

export default HelloPanda;

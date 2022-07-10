import snacksList from "./snacksList";
import { NavLink } from "react-router-dom";

const Pocky = () => {
    let snack = 'Pocky';
    let snacksImg = snacksList[snack].image;
  return (
    <div>
      <h1>Pocky</h1>
      <div>
        <NavLink exact to="/">
          Go Back
        </NavLink>
      </div>
      <img src={snacksImg} alt={snack} />
    </div>
  );
};

export default Pocky;

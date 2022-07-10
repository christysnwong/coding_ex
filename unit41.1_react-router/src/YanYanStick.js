import snacksList from "./snacksList";
import { NavLink } from "react-router-dom";

const YanYanStick = () => {
    let snack = "YanYanStick";
    let snacksImg = snacksList[snack].image;
  return (
    <div>
      <h1>Yan Yan Stick</h1>
      <div>
        <NavLink exact to="/">
          Go Back
        </NavLink>
      </div>
      <img src={snacksImg} alt={snack} />
    </div>
  );
};

export default YanYanStick;

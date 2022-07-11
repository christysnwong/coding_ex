import { Link } from "react-router-dom";
import "./Colors.css"

const Colors = ({colors}) => {   
  return (
    <div className="Colors">
      {console.log("colors", colors)}

      <h1>Welcome to the Color Factory</h1>
      <div>
        <Link to="/colors/new">Add a color</Link>
      </div>

      {colors.length !== 0 && <h5>Please select a color</h5>}
      {/* {colors.length !== 0 &&
        colors.map((color, idx) => (
          <div key={idx}>
            <Link to={`/colors/${color.name}`}>{color.name}</Link>
          </div>
        ))} */}
      {colors.length !== 0 &&
        Object.keys(colors).map((colorName, idx) => (
          <div key={idx}>
            <Link to={`/colors/${colorName}`}>{colorName}</Link>
          </div>
        ))}
    </div>
  );
};

export default Colors;

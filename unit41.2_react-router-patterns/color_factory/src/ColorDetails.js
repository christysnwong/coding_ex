import { NavLink, useHistory, useParams } from "react-router-dom";
import "./ColorDetails.css";

const ColorDetails = ({colors}) => {
    const { color } = useParams();
    const history = useHistory();
    
    // const colorData = colors.find(c => c.name === color);
    const colorValue = colors[color];

    if (!colorValue) {
        history.push("/colors")
    }

    return (
        <div className="ColorDetails" style={{backgroundColor: colorValue}}>
            <h1>This is {color}.</h1>
            <NavLink exact to="/colors">Go Back</NavLink>
        </div>
    )
}

export default ColorDetails;
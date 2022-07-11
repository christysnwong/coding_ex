import { NavLink } from "react-router-dom";
import "./DogList.css"

const DogList = (props) => {
  return (
    <div className="DogList">
      {props.dogs.map((dog, idx) => (
        <div key={idx}>
          <NavLink exact to={`/dogs/${dog.name.toLowerCase()}`}>
            <h1>{dog.name}</h1>
            <img src={dog.src} alt={dog.name} />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default DogList;

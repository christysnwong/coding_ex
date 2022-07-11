import {useState} from "react";
import { useHistory } from "react-router-dom";
import "./ColorsForm.css"

const ColorsForm = ({add}) => {
  const initialValues = {
    name: '',
    hexValue: '#000000'

  }
  const [color, setColor] = useState(initialValues);
  const history = useHistory();
  
  const handleChange = e => {
    const { name, value } = e.target;
    setColor((data) => ({
      ...data,
      [name]: value,
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    // add(color);
    add({[color.name]: color.hexValue})
    setColor(initialValues);
    history.push("/colors");
  }

  return (
    <div className="ColorsForm">
      {console.log(color)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Color Name </label>
          <input
            id="name"
            type="text"
            name="name"
            value={color.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="hexValue">Color Value </label>
          <input
            id="hexValue"
            type="color"
            name="hexValue"
            value={color.hexValue}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ColorsForm;

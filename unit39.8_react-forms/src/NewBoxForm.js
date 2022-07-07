import React, { useState } from "react";

const NewBoxForm = ({addBox}) => {
    const INITIAL_STATE = {
        width: '',
        height: '',
        bgColor: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault();
        addBox(formData);
        setFormData(INITIAL_STATE);
    }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="width">Box Width </label>
        <input
          id="width"
          type="range"
          name="width"
          min="100"
          max="200"
          placeholder="Box Width in pixels"
          value={formData.width}
          onChange={handleChange}
        />
        <label htmlFor="height">Box Height </label>
        <input
          id="height"
          type="range"
          name="height"
          min="100"
          max="200"
          placeholder="Box Height in pixels"
          value={formData.height}
          onChange={handleChange}
        />
        <label htmlFor="bgcolor">Color </label>
        <input
          id="bgcolor"
          type="text"
          name="bgColor"
          placeholder="Colour of the Box"
          value={formData.bgColor}
          onChange={handleChange}
        />
        <button>Add Box</button>
      </form>
    );
};

export default NewBoxForm;
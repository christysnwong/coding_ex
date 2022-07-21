import { useState } from "react";


const LoginForm = ({ login }) => {
  const initValues = {
    username: "",
    password: ""
  }
  const [formData, setFormData] = useState(initValues);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name] : value
    }))

  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await login(formData);
    setFormData(initValues);

  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;

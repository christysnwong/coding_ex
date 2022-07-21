import { useState } from "react";

const SignUpForm = ({signup}) => {
  const initValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
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
    await signup(formData);
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
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;



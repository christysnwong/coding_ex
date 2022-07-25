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
    <div className="LoginForm">
      <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Login Form</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary float-end mt-4" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

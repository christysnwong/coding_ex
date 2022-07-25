import { useContext, useState } from "react";
import UserContext from "../UserContext";
import JoblyApi from "../api";

const ProfileEditForm = () => {
  const { currUser, setCurrUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    "firstName": currUser.firstName,
    "lastName": currUser.lastName,
    "email": currUser.email,
    "password": ""
  })

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name] : value
    }))

  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      let token = await JoblyApi.login({username: currUser.username, password: formData.password});

      if (token) {
        let user = await JoblyApi.patchUser(currUser.username, formData);
        console.debug("ProfileEditForm - patch user", user);

        setCurrUser(currUserData => ({ 
          ...currUserData,
          firstName: formData.firstName, 
          lastName: formData.lastName,
          email: formData.email
        }));

        alert("User info is updated.");
      }
              
        
      
    } catch (e) {
      console.log(e);
      alert(e);
    }
    
    
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:{" "}
              </label>
              <p className="form-control-plaintext">{currUser.username}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Confirm password to make changes
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
            <button className="btn btn-primary mt-4">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;

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
    <div>
      
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username: </label>
          {currUser.username}
        </p>

        <p>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="password">Confirm password to make changes</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </p>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ProfileEditForm;

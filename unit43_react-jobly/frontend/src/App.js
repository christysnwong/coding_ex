import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import Routes from './routes/Routes';
import NaviBar from './routes/NaviBar';
import JoblyApi from './api';
import UserContext from './UserContext';
import jwt from "jsonwebtoken";
import useLocalStorage from './useLocalStorage';


function App() {
  const [currUser, setCurrUser] = useState(null);
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("joblyToken") || null));
  const [token, setToken] = useLocalStorage("jobly-token");
  const [jobIds, setJobIds] = useState([]);
  const history = useHistory();

  console.debug("App - beginning check for token", token);

  // Log in a user
  const login = async (userData) => {
    try {
      let token = await JoblyApi.login(userData);
      setToken(token);
      // localStorage.setItem("joblyToken", JSON.stringify(token));
      history.push("/");

    } catch (e) {
      console.log(e);
      alert(e);
    }
    
  };

  // Log out a user by clearing user's info and token 
  const logout = () => {
    setCurrUser(null);
    setToken(null);
    // localStorage.removeItem("joblyToken");
  }

  // Signup a user
  const signup = async (newUserData) => {
    try {
      let token = await JoblyApi.signup(newUserData);
      setToken(token);
      // localStorage.setItem("joblyToken", JSON.stringify(token));
      history.push("/");
      
    } catch (e) {
      console.log(e);
      alert(e);
    }
    
  }

  // Check job application status
  const isJobApplied = (jobId) => {
    return jobIds.includes(jobId);
  }

  // Apply to a job - calls API to update user's application as well as setting jobIds locally
  const applyJob = async (jobId) => {

    if (jobIds.includes(jobId)) {
      alert('You have already applied for this job.')
    } else {
      await JoblyApi.applyJob(currUser.username, jobId);
      setJobIds((jobIds) => [...jobIds, jobId]);
    }
    
    
  }

  useEffect(() => {
    // Get User's info. useEffect reruns when the status of the token changes
    const getCurrUser = async () => {
      if(token) {
        try {

          let payload = jwt.decode(token);
          
          console.debug("App - useEffect set api token", token)
          JoblyApi.token = token;
          let user = await JoblyApi.getUser(payload.username);

          console.debug("App - useEffect jwt decode - payload", payload);
          console.debug("App - useEffect currUser", user);
          console.debug("App - useEffect currUser app", user.applications);

          setCurrUser(user);
          setJobIds(user.applications);

        } catch (e) {
          console.log(e);
        }
        
      }
    }

    getCurrUser();
    console.debug("App - useEffect check - got token and currUser?");

  }, [token])


  return (
    <UserContext.Provider
      value={{ currUser, setCurrUser, isJobApplied, applyJob }}
    >
      <div className="App">
        <NaviBar logout={logout} />
        <Routes
          apply={applyJob}
          login={login}
          logout={logout}
          signup={signup}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;

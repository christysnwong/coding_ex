import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "../Home.js";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";
import ProfileEditForm from "../forms/ProfileEditForm";
import PrivateRoute from "./PrivateRoute";

const Routes = ({login, signup}) => {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`
  );
  
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/profile">
          <ProfileEditForm />
        </Route> */}

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>
        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <ProfileEditForm />
        </PrivateRoute>


        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm signup={signup} />
        </Route>
        <Route exact path="/logout">
          <Redirect to="/" />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
} 

export default Routes;
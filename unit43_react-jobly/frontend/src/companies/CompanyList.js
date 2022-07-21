import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Redirect } from "react-router-dom";

import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../forms/SearchForm";
import "./CompanyList.css"

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { currUser } = useContext(UserContext);

  const searchForCompanies = async (name) => {
    let companyList = await JoblyApi.getCompanies(name);
    setCompanies(companyList);
  }

  useEffect(() => {
    searchForCompanies();
  }, []);

  // if (!currUser) {
  //   console.debug("CompanyList - REDIRECT to login")
  //   return <Redirect to="/login" />;
  // }


  return (
    <div className="CompanyList">
      <SearchForm searchForCompanies={searchForCompanies} />

      {companies.map((company) => (
        <div key={company.handle}>
          <CompanyCard id={company.handle} key={company.handle} company={company} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CompanyList;

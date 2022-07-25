import { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
import UserContext from "../UserContext";

const CompanyDetail = ({apply}) => {
  const [company, setCompany] = useState("");
  const { handle } = useParams();
  const { currUser } = useContext(UserContext);

  
  useEffect(() => {
    async function getCompany(handle) {
      let companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);
    }

    getCompany(handle);
  }, [])

  // if (!currUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      {company.jobs &&
        company.jobs.map((job) => (
          <div key={job.id}>
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
            />
            
            
          </div>
        ))}
    </div>
  );
};

export default CompanyDetail;

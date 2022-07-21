import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Redirect } from "react-router-dom";

import JoblyApi from "../api";
import JobCard from "./JobCard";
import SearchForm from "../forms/SearchForm";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { currUser, applyJob, isJobApplied } = useContext(UserContext);


  const searchForJobs = async (title) => {
    let jobList = await JoblyApi.getJobs(title);
    setJobs(jobList);
  };

  useEffect(() => {
    searchForJobs();

  }, []);

  // if (!currUser) {
  //   return <Redirect to="/login" />;
  // }
  

  return (
    <div>
      
      <SearchForm searchForJobs={searchForJobs} />
      {jobs.map((job) => (
        <div key={job.id}>
          <JobCard
            key={job.id}
            id={job.id}
            companyName={job.companyName}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />
          <button onClick={() => applyJob(job.id)} disabled={isJobApplied(job.id)}>
            {isJobApplied(job.id) ? "Applied" : "Apply"}
          </button>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default JobList;

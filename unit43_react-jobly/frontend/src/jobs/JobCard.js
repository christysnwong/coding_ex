import { useContext } from "react";
import UserContext from "../UserContext";
import "./JobCard.css";

const JobCard = ({ id, companyName, title, salary, equity }) => {
  const { applyJob, isJobApplied } = useContext(UserContext);

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div>Salary: ${salary}</div>}
        {equity !== undefined && <div>Equity: {equity}</div>}

        <button
          className="btn btn-danger fw-bold text-uppercase float-end"
          onClick={() => applyJob(id)}
          disabled={isJobApplied(id)}
        >
          {isJobApplied(id) ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;

import { NavLink } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ company }) => {
  let logoLink;

  if (company.logoUrl) {
    logoLink = company.logoUrl;
  }
  

  return (
    <div className="CompanyCard card">
      <NavLink to={`companies/${company.handle}`}>
        <div className="card-body">
          <h6 className="card-title">
            {company.name}
            {logoLink && <img src={logoLink} alt={`${company.handle}-logo`} className="float-end ms-5" />}
          </h6>
          <p>{company.description}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default CompanyCard;

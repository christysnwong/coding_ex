import { NavLink } from "react-router-dom";


const CompanyCard = ({ company }) => {
  let logoLink;

  if (company.logoUrl) {
    logoLink = company.logoUrl;
  }
  

  return (
    <div>
      <NavLink to={`companies/${company.handle}`}>
        {logoLink && (
          <img src={logoLink} alt={`${company.handle}-logo`} />
        )}
        <h4>{company.name}</h4>
        <p>{company.description}</p>
      </NavLink>
    </div>
  );
};

export default CompanyCard;

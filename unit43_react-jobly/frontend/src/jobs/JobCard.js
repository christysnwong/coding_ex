const JobCard = ({companyName, title, salary, equity}) => {
  return (
    <div>
      <h4>{title}</h4>
      <h5>{companyName}</h5>
      <h6>{salary && `Salary: ${salary}`}</h6>
      <h6>Equity: {equity}</h6>
      
    </div>
  );
};

export default JobCard;



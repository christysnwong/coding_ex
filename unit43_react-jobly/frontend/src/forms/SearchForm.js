import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ searchForCompanies, searchForJobs }) => {
  const [query, setQuery] = useState("");
  const search = searchForCompanies || searchForJobs;

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query === "") {
      search();
    }
    search(query.trim());
  };

  return (
    <div className="SearchForm mb-4">
      {console.debug("SearchForm - Query:", query)}
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          id="query"
          name="query"
          className="form-control flex-grow-1"
          placeholder="Enter search term"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;

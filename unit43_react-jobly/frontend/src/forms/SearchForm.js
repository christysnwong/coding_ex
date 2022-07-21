import { useState } from "react";

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
    <div>
      {console.debug("SearchForm - Query:", query)}
      <form onSubmit={handleSubmit}>
        <input
          id="query"
          name="query"
          placeholder="Enter search term"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;

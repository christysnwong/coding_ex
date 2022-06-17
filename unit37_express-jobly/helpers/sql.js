const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // extract keys or column names from dataToUpdate
  const keys = Object.keys(dataToUpdate);

  // If no keys, throw BadRequestError
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      // depending on the keys in the dataToUpdate,
      // list out keys and make them equal to $1, $2, so forth
      // convert js names to sql names with jsToSql[colName]
      // if js names not available, use colName
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    // set setCols to be cols in one string which is joined by comma
    setCols: cols.join(", "),
    // set values to be updated values into one string
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

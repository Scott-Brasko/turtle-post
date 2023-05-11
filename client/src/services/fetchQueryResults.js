const fetchQueryResults = async (pg_uri, query) => {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };
  const url = `/sql/query?uri=${pg_uri}&queryString=${query}`;
  try {
    console.log(url);
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.status >= 400 ) return {err: result.err};
    return result;
  } catch (err) {
    (err) => console.log(`fetchDB: ERROR: ${err}`);
  }
};

export default fetchQueryResults;

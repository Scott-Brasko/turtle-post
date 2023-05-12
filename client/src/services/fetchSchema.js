const fetchSchema = async (pg_uri) => {
  if (pg_uri === '') return;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };
  const url = `http://localhost:3000/sql/schema?uri=${pg_uri}`;
  try {
    console.log(url);
    const response = await fetch(url, options);
    // should revist error catching to display something on screen
    if (response.status !== 200) return {err: response.err};
    return response.json();
  } catch (err) {
    (err) => console.log(`fetchDB: ERROR: ${err}`);
  }
};

export default fetchSchema;

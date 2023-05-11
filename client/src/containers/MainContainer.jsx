import { useState, useEffect } from 'react';
import ConnectionCreator from '../components/ConnectionCreator/ConnectionCreator';
import SchemaDisplay from '../components/SchemaDisplay/SchemaDisplay';
import QueryDisplay from '../components/QueryDisplay/QueryDisplay';
import QueryCreator from '../components/QueryCreator/QueryCreator';
import ResultsDisplay from '../components/ResultsDisplay/ResultsDisplay';
import fetchSchema from '../services/fetchSchema';
import fetchQueryResults from '../services/fetchQueryResults';

// import Parser for all databases
const { Parser } = require('node-sql-parser/build/postgresql');
const parser = new Parser();

const MainContainer = () => {
  // uri and schema state
  const [uri, setURI] = useState('');
  // state [error, schema, connected]
  const [schema, setSchema] = useState([false, { database: '', tableList: [] }, false]);

  const updateURI = (inputText) => {
    return async () => {
      if (inputText.trim() === '') return;
      setURI(inputText);
    };
  };

  // if uri is updated, get a new schema
  useEffect(() => {
    if (!uri) return;
    const fetchData = async () => {
      const response = await fetchSchema(uri);
      if ('err' in response) setSchema([true, { database: '', tableList: [] }, false]);
      else {
        setSchema([false, response, true]);
      }
    };
    fetchData();
  }, [uri]);

  // query state
  const [queryResults, setQueryResults] = useState();
  const [queryAST, setQueryAST] = useState();
  const [queryResultError, setQueryResultError] = useState([false, '']);

  const updateQueryAST = (inputText) => {
    return () => {
      setQueryAST(parser.astify(inputText));
      console.log(queryAST);
    };
  };

  // if query is updated, get new query results
  useEffect(() => {
    if (!queryAST) return;
    const fetchData = async () => {
      const response = await fetchQueryResults(uri, parser.sqlify(queryAST));
      if ('err' in response) setQueryResultError([true, response.err]);
      else {
        setQueryResults(response);
        setQueryResultError([false, '']);
      }
    };
    fetchData();
  }, [queryAST]);

  return (
    <>
      <ConnectionCreator updateURI={updateURI} />
      <SchemaDisplay schema={schema}  />
      <QueryDisplay queryAST={queryAST} schema={schema[1]}/>
      <QueryCreator updateQuery={updateQueryAST} schemaStatus={schema[2]}/>
      <ResultsDisplay queryResults={queryResults} queryResultError={queryResultError} />
    </>
  );
};

export default MainContainer;

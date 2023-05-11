const { Pool } = require('pg');
const sqlController = {};

sqlController.createConnection = (req, res, next) => {
  const PG_URI = req.query.uri;

  const pool = new Pool({
    connectionString: PG_URI,
  });

  res.locals.connection = pool;
  next();
};

sqlController.getDBName = async (req, res, next) => {
  const queryString = 'SELECT current_database();';

  try {
    console.log(`Executing query: ${queryString}`);
    const data = await res.locals.connection.query(queryString);
    res.locals.dbName = data.rows[0].current_database;
    next();
  } catch (err) {
    return next({
      log: `getDBName has an error: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

sqlController.getTables = async (req, res, next) => {
  const queryString = `SELECT *
  FROM information_schema.tables
  WHERE TABLE_SCHEMA = 'public' AND table_type = 'BASE TABLE'`;

  try {
    console.log(`Executing query: ${queryString}`);
    const data = await res.locals.connection.query(queryString);
    res.locals.tableData = data.rows;
    next();
  } catch (err) {
    return next({
      log: `getTables has an error: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

sqlController.getOIDS = async (req, res, next) => {
  const queryString = ` SELECT *
  from pg_class`;

  try {
    console.log(`Executing query: ${queryString}`);
    const data = await res.locals.connection.query(queryString);
    res.locals.oidData = data.rows;
    next();
  } catch (err) {
    return next({
      log: `getOIDS has an error: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

sqlController.getFields = async (req, res, next) => {
  const queryString = `SELECT table_schema, table_name, column_name, data_type 
  FROM INFORMATION_SCHEMA.COLUMNS 
  WHERE table_schema = 'public' AND table_name != 'pg_stat_statements'`;

  try {
    console.log(`Executing query: ${queryString}`);
    const data = await res.locals.connection.query(queryString);
    res.locals.fieldData = data.rows;
    next();
  } catch (err) {
    return next({
      log: `getTables has an error: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

sqlController.normalizeSchema = (req, res, next) => {
  const schema = {};
  const tables = {};
  schema.database = res.locals.dbName;

  // add each table to tables object
  res.locals.tableData.forEach((table) => {
    table.fieldList = [];
    table.fields = {};
    tables[table.table_name] = table;
  });

  // add each oid to table
  res.locals.oidData.forEach((el) => {
    if (el.relname in tables) tables[el.relname].oid = el.oid;
  });

  // add each field to fields array and object within tables
  res.locals.fieldData.forEach((field) => {
    tables[field.table_name].fieldList.push(field);
    tables[field.table_name].fields[field.column_name] = field;
  });

  schema.tables = tables;
  schema.tableList = res.locals.tableData;

  res.locals.schema = schema;

  return next();
};

sqlController.runQuery = async (req, res, next) => {
  const queryString = req.query.queryString;

  try {
    console.log(`Executing query: ${queryString}`);
    const data = await res.locals.connection.query(queryString);
    res.locals.queryResults = data;
    next();
  } catch (err) {
    return next({
      log: `runQuery has an error: ${err}`,
      status: 400,
      message: { err: err.toString() },
    });
  }
};

module.exports = sqlController;

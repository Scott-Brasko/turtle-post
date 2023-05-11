import PropTypes from 'prop-types';
import styles from './SchemaDisplay.module.scss';

// should be easy to allow multiple DBs here
const SchemaDisplay = (props) => {
  return (
    <div className={styles.container}>
      {props.schema[0] ? (
        <em className={styles.error}>Invalid Postgres URI</em>
      ) : (
        <Database schema={props.schema[1]} />
      )}
    </div>
  );
};

SchemaDisplay.propTypes = {
  schema: PropTypes.array,
};

// should revisit to make collapsible
const Database = (props) => {
  const tableList = [];

  if (props.schema)
    props.schema.tableList.forEach((el, i) =>
      tableList.push(<TableItem table={el} key={i} />)
    );

  return (
    <>
      {props.schema && (
        <>
          Database: {props.schema.database}
          {tableList}
        </>
      )}
    </>
  );
};

Database.propTypes = {
  schema: PropTypes.object,
};

const TableItem = (props) => {
  return <li className='table-item'>{props.table.table_name}</li>;
};

TableItem.propTypes = {
  table: PropTypes.object,
};

export default SchemaDisplay;

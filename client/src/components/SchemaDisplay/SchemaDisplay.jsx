import PropTypes from 'prop-types';
import styles from './SchemaDisplay.module.scss';

// should be easy to allow multiple DBs here
const SchemaDisplay = (props) => {
  return (
    <div className={`${styles.container} card`}>
      <h3 className='user-select-none'>Table Display</h3>
      {props.schema[0] ? (
        <em className={`user-select-none ${styles.error}`}>Invalid Postgres URI</em>
      ) : (
        <div className={`card`}>
        <Database schema={props.schema[1]} />
        </div>
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
          <div className={`card-header user-select-none`}>Database: {props.schema.database}</div>
          <ul className={`list-group list-group-flush`}>{tableList}</ul>
        </>
      )}
    </>
  );
};

Database.propTypes = {
  schema: PropTypes.object,
};

const TableItem = (props) => {
  return (
    <li className={`list-group-item ${styles.table}`}>
      {props.table.table_name}
    </li>
  );
};

TableItem.propTypes = {
  table: PropTypes.object,
};

export default SchemaDisplay;

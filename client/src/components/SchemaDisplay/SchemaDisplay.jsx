import PropTypes from 'prop-types';
import styles from './SchemaDisplay.module.scss';

// should be easy to allow multiple DBs here
const SchemaDisplay = (props) => {
  return (
    <div className={styles.container}>
      <Database schema={props.schema}/>
    </div>
  );
};

SchemaDisplay.propTypes = {
  schema: PropTypes.object
};

// should revisit to make collapsible
const Database = (props) => {
  const tableList = [];

  props.schema.tableList.forEach((el, i) => tableList.push(<TableItem table={el} key={i}/>));

  return (
    <>
      {props.schema.name}
      {tableList}
    </>
  );
};

Database.propTypes = {
  schema: PropTypes.object
};

const TableItem = (props) => {
  return <li className='table-item'>{props.table.name}</li>;
};

TableItem.propTypes = {
  table: PropTypes.object
};

export default SchemaDisplay;
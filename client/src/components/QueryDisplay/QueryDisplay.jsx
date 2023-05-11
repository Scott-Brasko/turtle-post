import CloseButton from 'react-bootstrap/CloseButton';
import PropTypes from 'prop-types';
import styles from './QueryDisplay.module.scss';


const QueryDisplay = (props) => {
  if (!props.queryAST) return <div className={styles.container}></div>;

  const tableList = [];
  props.queryAST.from.forEach((table, i) => {
    // grab fields from schema
    table.fields = props.schema.tables[table.table].fieldList.slice();
    tableList.push(<TableDisplay table={table} key={i} />);
  });
  return (
    <div className={styles.container}>
      {tableList}
    </div>
  );
};

QueryDisplay.propTypes = {
  queryAST: PropTypes.object,
  schema: PropTypes.object
};

const TableDisplay = (props) => {
  
  return (
    <div>
      <TableHeader tableName={props.table.table}/>
      <FieldTable fields={props.table.fields}/>
    </div>
  );
};

TableDisplay.propTypes = {
  table: PropTypes.object
};

const TableHeader = (props) => {
  return (
    <div>
      <h3>{props.tableName}</h3>
      <CloseButton />
    </div>
  );
};

TableHeader.propTypes = {
  tableName: PropTypes.string
};

const FieldTable = (props) => {
  const fieldList = [];
  props.fields.forEach((el, i) => {
    fieldList.push(<FieldRow field={el} key={i}/>);
  });

  return (
    <ul>
      {fieldList}
    </ul>
  );
};

FieldTable.propTypes = {
  fields: PropTypes.array
};

const FieldRow = (props) => {
  return (
    <li>{props.field.column_name}</li>
  );
};

FieldRow.propTypes = {
  field: PropTypes.object
};

export default QueryDisplay;

import PropTypes from 'prop-types';
import styles from './QueryDisplay.module.scss';
import Draggable from 'react-draggable';

const QueryDisplay = (props) => {
  if (!props.queryActive)
    return <div className={`card ${styles.container}`}></div>;

  const tableList = [];
  props.queryAST.from.forEach((table, i) => {
    // grab fields from schema
    if (props.schema.tables[table.table]) {
      table.fields = props.schema.tables[table.table].fieldList.slice();
      tableList.push(<TableDisplay table={table} key={i} />);
    }
    console.log(table);
  });
  return <div className={`card ${styles.container}`}>{tableList}</div>;
};

QueryDisplay.propTypes = {
  queryAST: PropTypes.object,
  schema: PropTypes.object,
  queryResultError: PropTypes.bool,
  queryActive: PropTypes.bool,
};

const TableDisplay = (props) => {
  return (
    <Draggable bounds='parent' handle={`.${styles.cardHeader}`}>
      <div className={`card ${styles.card}`}>
        <TableHeader tableName={props.table.table} />
        <FieldTable fields={props.table.fields} />
      </div>
    </Draggable>
  );
};

TableDisplay.propTypes = {
  table: PropTypes.object,
};

const TableHeader = (props) => {
  return (
    <div
      role='button'
      className={`user-select-none card-header ${styles.cardHeader}`}
    >
      {props.tableName}
    </div>
  );
};

TableHeader.propTypes = {
  tableName: PropTypes.string,
};

const FieldTable = (props) => {
  const fieldList = [];
  props.fields.forEach((el, i) => {
    fieldList.push(<FieldRow field={el} key={i} />);
  });

  return (
    <ul className={`list-group list-group-flush ${styles.cardTable}`}>
      {fieldList}
    </ul>
  );
};

FieldTable.propTypes = {
  fields: PropTypes.array,
};

const FieldRow = (props) => {
  return (
    <li className={`list-group-item ${styles.cardItem}`}>
      {props.field.column_name}
    </li>
  );
};

FieldRow.propTypes = {
  field: PropTypes.object,
};

export default QueryDisplay;

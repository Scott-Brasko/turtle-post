import PropTypes from 'prop-types';
import styles from './ResultsDisplay.module.scss';
import Table from 'react-bootstrap/Table';

const ResultsDisplay = (props) => {
  return (
    <div className={styles.container}>
      {props.queryResultError[0] && (
        <em className={styles.error}>{props.queryResultError[1]}</em>
      )}
      {props.queryResults && props.queryResults.fields.length !== 0 && (
        <Table striped hover bordered className={styles.table}>
          <ResultsHeader columns={props.queryResults.fields} />
          <ResultsBody
            rows={props.queryResults.rows}
            columns={props.queryResults.fields}
          />
        </Table>
      )}
    </div>
  );
};

ResultsDisplay.propTypes = {
  queryResults: PropTypes.object,
  queryResultError: PropTypes.array,
};

const ResultsHeader = (props) => {
  const columnList = [];
  props.columns.forEach((el, i) =>
    columnList.push(<ResultsHeaderColumn field={el} key={i} />)
  );

  return (
    <thead>
      <tr>{columnList}</tr>
    </thead>
  );
};

ResultsHeader.propTypes = {
  columns: PropTypes.array,
};

const ResultsHeaderColumn = (props) => {
  return (
    <>
      <th>{props.field.name}</th>
    </>
  );
};

ResultsHeaderColumn.propTypes = {
  field: PropTypes.object,
};

const ResultsBody = (props) => {
  const rowList = [];
  props.rows.forEach((el, i) =>
    rowList.push(<ResultsRow row={el} key={i} columns={props.columns} />)
  );
  return <tbody>{rowList.length !== 0 && rowList}</tbody>;
};

ResultsBody.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
};

const ResultsRow = (props) => {
  const resultItemList = [];

  props.columns.forEach((column, i) => {
    if (props.row[column.name])
      resultItemList.push(<ResultsItem value={props.row[column.name]} key={i} />);
    else resultItemList.push(<ResultsItem value={''} key={i} />);
  });

  return <tr>{resultItemList}</tr>;
};

ResultsRow.propTypes = {
  row: PropTypes.object,
  columns: PropTypes.array,
};

const ResultsItem = (props) => {
  return <td>{props.value}</td>;
};

ResultsItem.propTypes = {
  value: PropTypes.node,
};

export default ResultsDisplay;

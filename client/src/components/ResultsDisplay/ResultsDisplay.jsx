import PropTypes from 'prop-types';
import styles from './ResultsDisplay.module.scss';

const ResultsDisplay = (props) => {
  if (props.queryResultError[0])
    return (
      <div className={`d-flex align-items-center justify-content-center ${styles.container}`}>
        <div className={`card w-25 p-3  ${styles.error}`} style={{backgroundColor: '#eee'}} >{props.queryResultError[1]}</div>
      </div>
    );
  return (
    <div className={`card ${styles.container}`}>
      {props.queryResults[0] && (
        <table
          className={`table table-light table-striped table-hover table-bordered ${styles.table}`}
        >
          <ResultsHeader columns={props.queryResults[1].fields} />
          <ResultsBody
            rows={props.queryResults[1].rows}
            columns={props.queryResults[1].fields}
          />
        </table>
      )}
    </div>
  );
};

ResultsDisplay.propTypes = {
  queryResults: PropTypes.array,
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
      resultItemList.push(
        <ResultsItem value={props.row[column.name]} key={i} />
      );
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

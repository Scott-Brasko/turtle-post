import PropTypes from 'prop-types';
import styles from './ResultsDisplay.module.scss';

const ResultsDisplay = (props) => {
  return (
    <div className={styles.container}>
      <table>
        <ResultsHeader />
        <ResultsBody />
      </table>
    </div>
  );
};

const ResultsHeader = (props) => {
  return (
    <thead>
      <tr>
        <ResultsHeaderColumn field={{ name: 'header1' }} />
        <ResultsHeaderColumn field={{ name: 'header2' }} />
        <ResultsHeaderColumn field={{ name: 'header3' }} />
        <ResultsHeaderColumn field={{ name: 'header4' }} />
      </tr>
    </thead>
  );
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
  return (
    <tbody>
      <ResultsRow />
      <ResultsRow />
      <ResultsRow />
      <ResultsRow />
    </tbody>
  );
};

const ResultsRow = (props) => {
  return (
    <tr>
      <ResultsItem cell={{value:'cell1'}}/>
      <ResultsItem cell={{value:'cell2'}}/>
      <ResultsItem cell={{value:'cell3'}}/>
      <ResultsItem cell={{value:'cell4'}}/>
    </tr>
  );
};

const ResultsItem = (props) => {
  return <td>{props.cell.value}</td>;
};

ResultsItem.propTypes = {
  cell: PropTypes.object,
};

export default ResultsDisplay;

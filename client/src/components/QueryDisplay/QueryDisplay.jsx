import CloseButton from 'react-bootstrap/CloseButton';
import PropTypes from 'prop-types';
import styles from './QueryDisplay.module.scss';

const QueryDisplay = (props) => {
  return (
    <div className={styles.container}>
      <TableDisplay />
    </div>
  );
};


const TableDisplay = (props) => {
  return (
    <div>
      <TableHeader />
      <FieldTable />
    </div>
  );
};

const TableHeader = (props) => {
  return (
    <div>
      <h3>Table1</h3>
      <CloseButton />
    </div>
  );
};

const FieldTable = (props) => {
  return (
    <ul>
      <FieldRow field={ {name:'field1'} } />
      <FieldRow field={ {name:'field2'} } />
      <FieldRow field={ {name:'field3'} } />
      <FieldRow field={ {name:'field4'} } />
      <FieldRow field={ {name:'field5'} } />
      <FieldRow field={ {name:'field6'} } />
    </ul>
  );
};

const FieldRow = (props) => {
  return (
    <li>{props.field.name}</li>
  );
};

FieldRow.propTypes = {
  field: PropTypes.object
};

export default QueryDisplay;

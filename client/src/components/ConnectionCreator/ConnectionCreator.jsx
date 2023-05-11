import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './ConnectionCreator.module.scss';

const ConnectionCreator = (props) => {
  const [inputText, setInputText] = useState(
    'postgres://nmwquvrw:tqia7qeM2xv0pCH_QpCjXRvZP8f7sOeW@castor.db.elephantsql.com/nmwquvrw'
  );
  const updateInputText = (e) => setInputText(e.target.value);

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') document.getElementById('connection-button').click();
  };

  return (
    <div className={styles.container}>
      <div className={`card user-select-none ${styles.card}`}>
      Postgres Connection URL: 
        <Input
          onChange={updateInputText}
          onKeyUp={handleKeyUp}
          value='postgres://nmwquvrw:tqia7qeM2xv0pCH_QpCjXRvZP8f7sOeW@castor.db.elephantsql.com/nmwquvrw'
        />
        <Button onClick={props.updateURI(inputText)} id='connection-button' className={`btn btn-outline-primary ${styles.button}`}>
          Get Schema
        </Button>
      </div>
    </div>
  );
};

ConnectionCreator.propTypes = {
  updateURI: PropTypes.func,
};

export default ConnectionCreator;

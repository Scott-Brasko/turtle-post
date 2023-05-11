import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import Button from '../ui/Button';
import styles from './QueryCreator.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

// import { okaidia } from '@uiw/codemirror-theme-okaidia';

const QueryCreator = (props) => {
  const defaultCode = 'SELECT *\nFROM MyTable';

  const [inputText, setInputText] = useState(defaultCode);
  const updateInputText = (e) => {
    setInputText(e);
  };

  return (
    <div className={`card ${styles.container}`}>
      <CodeMirror
        value={defaultCode}
        height='215px'
        // theme={okaidia}
        basicSetup={{
          autocompletion: false,
          lintKeymap: true,
        }}
        extensions={[sql()]}
        onChange={updateInputText}
      >
        <Button type='button' disabled={!props.schemaStatus} onClick={props.updateQuery(inputText)} className={`btn btn-outline-primary ${styles.button}`} id='query-button'>Execute</Button>
      </CodeMirror>
      
    </div>
  );
};

QueryCreator.propTypes = {
  updateQuery: PropTypes.func,
  defaultCode: PropTypes.string,
  schemaStatus: PropTypes.bool
};

export default QueryCreator;

import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import Button from '../ui/Button';
import styles from './QueryCreator.module.scss';

// import { okaidia } from '@uiw/codemirror-theme-okaidia';

const QueryCreator = (props) => {
  return (
    <div className={styles.container}>
      <CodeMirror
        value={'SELECT *\nFROM MyTable\n'}
        height='200px'
        // theme={okaidia}
        basicSetup={{
          autocompletion: false,
          lintKeymap: true,
        }}
        extensions={[sql()]}
      >
        <Button>Execute</Button>
      </CodeMirror>
    </div>
  );
};

export default QueryCreator;

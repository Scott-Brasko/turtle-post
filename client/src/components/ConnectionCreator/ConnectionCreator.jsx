import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './ConnectionCreator.module.scss';

const ConnectionCreator = (props) => {
  const [url, setURL] = useState('');
  const updateURL = () => {
    if (inputText.trim() === '') return;
    setURL(inputText);
  };

  const [inputText, setInputText] = useState('');
  const updateInputText = (e) => setInputText(e.target.value);

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') document.getElementById('connection-button').click();
  };

  return (
    <div className={styles.container}>
      <Input onChange={updateInputText} onKeyUp={handleKeyUp} displayText='Postgres Connection URL: '/>
      <Button onClick={updateURL} id='connection-button'>Save</Button>
    </div>
  );
};

export default ConnectionCreator;

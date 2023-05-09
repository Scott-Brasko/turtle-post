import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ConnectionCreator from '../components/ConnectionCreator';
import SchemaDisplay from '../components/SchemaDisplay';
import QueryDisplay from '../components/QueryDisplay';
import QueryCreator from '../components/QueryCreator';
import ResultsDisplay from '../components/ResultsDisplay';

const MainContainer = () => {
  const [ inputText, setInputText ] = useState('Scott');
  const updateText = (e) => setInputText(e.target.value);

  


  const buttonProps = {
    onClick: testGet,
    className: 'button',
    children: <span>Button</span>,
  };

  const inputProps = {
    onChange: updateText,
    className: 'input',
  };

  return (
    <>
      <ConnectionCreator/>
      <SchemaDisplay/>
      <QueryDisplay/>
      <QueryCreator/>
      <ResultsDisplay/>
      <Button {...buttonProps}/>
    </>
  );
};

const testGet = async () => {
  const data = await fetch('http://localhost:3000/test');
  console.log(await data.text());
};



export default MainContainer;

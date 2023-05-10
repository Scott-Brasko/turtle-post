import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ConnectionCreator from '../components/ConnectionCreator/ConnectionCreator';
import SchemaDisplay from '../components/SchemaDisplay/SchemaDisplay';
import QueryDisplay from '../components/QueryDisplay/QueryDisplay';
import QueryCreator from '../components/QueryCreator/QueryCreator';
import ResultsDisplay from '../components/ResultsDisplay/ResultsDisplay';

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
      <ConnectionCreator />
      <SchemaDisplay schema={testSchema} />
      <QueryDisplay/>
      <QueryCreator/>
      <ResultsDisplay/>
      {/* <Button {...buttonProps}/> */}
    </>
  );
};


const testSchema = {
  name: 'database1',
  tableList: [{name:'table1'}, {name:'table2'}, {name:'table3'}]
};

const testGet = async () => {
  const data = await fetch('http://localhost:3000/test');
  console.log(await data.text());
};



export default MainContainer;

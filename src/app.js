import React from 'react';

const Grid = ({children}) => <div>{children}</div>;
const Row = ({children}) => <div>{children}</div>;
const Display = ({children}) => <span>{children}</span>;
const Button = ({onClick, children}) => <button onClick={onClick}>{children}</button>;

const App = ({value, onCommand}) => {
  const clickHandler = () => {
    onCommand();
  };

  return (
    <Grid>
      <Row>
        <Display>12,123</Display>
      </Row>
      <Row>
        <Button onClick={clickHandler}>AC</Button>
        <Button onClick={clickHandler}>±</Button>
        <Button onClick={clickHandler}>%</Button>
        <Button onClick={clickHandler}>÷</Button>
      </Row>
      <Row>
        <Button onClick={clickHandler}>7</Button>
        <Button onClick={clickHandler}>8</Button>
        <Button onClick={clickHandler}>9</Button>
        <Button onClick={clickHandler}>x</Button>
      </Row>
      <Row>
        <Button onClick={clickHandler}>4</Button>
        <Button onClick={clickHandler}>5</Button>
        <Button onClick={clickHandler}>6</Button>
        <Button onClick={clickHandler}>-</Button>
      </Row>
      <Row>
        <Button onClick={clickHandler}>1</Button>
        <Button onClick={clickHandler}>2</Button>
        <Button onClick={clickHandler}>3</Button>
        <Button onClick={clickHandler}>+</Button>
      </Row>
      <Row>
        <Button onClick={clickHandler}>0</Button>
        <Button onClick={clickHandler}>,</Button>
        <Button onClick={clickHandler}>=</Button>
      </Row>
    </Grid>
  );
};

export default App;

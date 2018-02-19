import React from 'react';
import {DIGIT, OPERATOR} from '../action';
import Grid from './grid';
import Row from './row';
import Display from './display';
import Button from './button';

const App = ({value, onClick}) => {
  return (
    <Grid>
      <Row>
        <Display>{value}</Display>
      </Row>
      <Row>
        <Button onClick={() => onClick(OPERATOR.ALL_CLEAR)}>{OPERATOR.ALL_CLEAR}</Button>
        <Button onClick={() => onClick(OPERATOR.CHANGE_SIGN)}>{OPERATOR.CHANGE_SIGN}</Button>
        <Button onClick={() => onClick(OPERATOR.PERCENT)}>{OPERATOR.PERCENT}</Button>
        <Button onClick={() => onClick(OPERATOR.DIVISION)}>{OPERATOR.DIVISION}</Button>
      </Row>
      <Row>
        <Button onClick={() => onClick(DIGIT['7'])}>{DIGIT['7']}</Button>
        <Button onClick={() => onClick(DIGIT['8'])}>{DIGIT['8']}</Button>
        <Button onClick={() => onClick(DIGIT['9'])}>{DIGIT['9']}</Button>
        <Button onClick={() => onClick(OPERATOR.MULTIPLICATION)}>{OPERATOR.MULTIPLICATION}</Button>
      </Row>
      <Row>
        <Button onClick={() => onClick(DIGIT['4'])}>{DIGIT['4']}</Button>
        <Button onClick={() => onClick(DIGIT['5'])}>{DIGIT['5']}</Button>
        <Button onClick={() => onClick(DIGIT['6'])}>{DIGIT['6']}</Button>
        <Button onClick={() => onClick(OPERATOR.SUBTRACTION)}>{OPERATOR.SUBTRACTION}</Button>
      </Row>
      <Row>
        <Button onClick={() => onClick(DIGIT['1'])}>{DIGIT['1']}</Button>
        <Button onClick={() => onClick(DIGIT['2'])}>{DIGIT['2']}</Button>
        <Button onClick={() => onClick(DIGIT['3'])}>{DIGIT['3']}</Button>
        <Button onClick={() => onClick(OPERATOR.ADDITION)}>{OPERATOR.ADDITION}</Button>
      </Row>
      <Row>
        <Button onClick={() => onClick(DIGIT['0'])}>{DIGIT['0']}</Button>
        <Button onClick={() => onClick(OPERATOR.DECIMAL_POINT)}>{OPERATOR.DECIMAL_POINT}</Button>
        <Button onClick={() => onClick(OPERATOR.RESULT)}>{OPERATOR.RESULT}</Button>
      </Row>
    </Grid>
  );
};

export default App;

export const OPERATOR = {
  RESULT: '=',
  DECIMAL_POINT: '.',
  ADDITION: '+',
  SUBTRACTION: '-',
  MULTIPLICATION: 'x',
  DIVISION: '÷',
  PERCENT: '%',
  CHANGE_SIGN: '±',
  ALL_CLEAR: 'AC'
};

export const DIGIT = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9'
};

export const APPLY_BUTTON = 'APPLY_BUTTON';

export const applyButton = button => ({
  type: APPLY_BUTTON,
  payload: button
});

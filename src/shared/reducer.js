import {APPLY_BUTTON, DIGIT, OPERATOR} from './action';

const trimLeft = v => {
  return v.replace(/^(-)?0*((0\.)|\d){1}/, '$1$2');
};

const applyOperator = (operator, a, b) => {
  switch (operator) {
    case OPERATOR.ADDITION: {
      return a + b;
    }
    case OPERATOR.SUBTRACTION: {
      return a - b;
    }
    case OPERATOR.MULTIPLICATION: {
      return a * b;
    }
    case OPERATOR.DIVISION: {
      return a / b;
    }
  }
};

const reducer = (state = {operator: OPERATOR.ADDITION, prevValue: '0', value: '0'}, action) => {
  const {prevValue, value} = state;

  const {type, payload} = action;
  if (type !== APPLY_BUTTON) return state;

  switch (payload) {
    case DIGIT['0']:
    case DIGIT['1']:
    case DIGIT['2']:
    case DIGIT['3']:
    case DIGIT['4']:
    case DIGIT['5']:
    case DIGIT['6']:
    case DIGIT['7']:
    case DIGIT['8']:
    case DIGIT['9']: {
      return {
        prevValue,
        value: trimLeft(value + payload)
      };
    }
    case OPERATOR.DECIMAL_POINT: {
      return {
        prevValue,
        value: value.includes('.') ? value : value + payload
      };
    }

    case OPERATOR.ALL_CLEAR: {
      return {
        prevValue: '0',
        value: '0'
      };
    }

    case OPERATOR.CHANGE_SIGN: {
      const isNegative = value.startsWith('-');
      return {
        prevValue,
        value: isNegative ? value.replace(/^-/, '') : `-${value}`
      };
    }

    case OPERATOR.PERCENT: {
      return {
        prevValue,
        value: (Number(value) / 100).toString()
      };
    }

    case OPERATOR.ADDITION:
    case OPERATOR.SUBTRACTION:
    case OPERATOR.MULTIPLICATION:
    case OPERATOR.DIVISION: {
      return {
        prevValue: applyOperator(payload, Number(prevValue), Number(value)).toString(),
        operator: payload,
        value: '0'
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;

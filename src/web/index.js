import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../shared/store';
import {applyButton} from '../shared/action';
import Container from './container';

const observeStore = (store, onChange) => {
  let currentState;

  const handleChange = () => {
    const nextState = store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  };

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

const store = createStore();

const changeHandler = value => {
  const action = applyButton(value);
  store.dispatch(action);
};

const mapStateToProps = state => {
  const {value} = state;

  return {value, onClick: changeHandler};
};

observeStore(store, state => {
  const props = mapStateToProps(state);
  ReactDOM.render(<Container {...props} />, document.getElementById('root'));
});

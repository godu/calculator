import React from 'react';
import {Button as NativeButton} from 'react-native';

const Button = ({onClick, children}) => (
  <NativeButton onPress={onClick} title={children} accessibilityLabel="children" />
);
export default Button;

// @flow

import React from 'react';
import {Platform, View} from 'react-native';
import App from '../shared/views/app';

const Container = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 20 : 0
      }}
    >
      <App value="123" />
    </View>
  );
};

export default Container;

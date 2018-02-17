import React, {PureComponent} from 'react';
import App from './app';

class Container extends PureComponent {
  render() {
    return <App {...this.props} />;
  }
}

export default Container;

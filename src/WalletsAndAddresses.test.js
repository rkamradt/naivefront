import React from 'react';
import ReactDOM from 'react-dom';
import WalletsAndAddresses from './WalletsAndAddresses';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WalletsAndAddresses />, div);
  ReactDOM.unmountComponentAtNode(div);
});

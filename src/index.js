import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WalletsAndAddresses from './WalletsAndAddresses';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WalletsAndAddresses />, document.getElementById('root'));
registerServiceWorker();

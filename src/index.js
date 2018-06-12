import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logon from './Logon';
import registerServiceWorker from './registerServiceWorker';

var handleLogonSubmit = function(data) {
  console.log('logging or signing on with ' + JSON.stringify(data));
};

ReactDOM.render(<Logon handleLogonSubmit={ handleLogonSubmit }/>, document.getElementById('root'));
registerServiceWorker();

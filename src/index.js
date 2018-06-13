import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Logon from './Logon';
import registerServiceWorker from './registerServiceWorker';

var handleLogonSubmit = (data) => {
  console.log('logging on with ' + JSON.stringify(data))
  fetch('/naiveuser/users/' + data.username, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'password': data.password
    }
  }).then(response => {
      if(response.status === 404) {
        fetch('/naiveuser/users', {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(!response.ok) {
            throw new Error('Network response was ' + response.status);
          }
          return response.json();
        }).then(json => {
          // go to user page
          console.log('post json returned = ' + JSON.stringify(json))
        }).catch(e => { throw new Error('error in POST') })
        return null;
      }
      return response.json()
    }).then(json => {
      if(json) {
        // go to user page
        console.log('get json returned = ' + JSON.stringify(json))
      }
    }
  ).catch(e => { throw new Error('error in GET') })
}

ReactDOM.render(<Logon handleLogonSubmit={ handleLogonSubmit }/>, document.getElementById('root'));
registerServiceWorker();

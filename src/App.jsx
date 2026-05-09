import React from 'react'
import './App.css'
import Header from './Header'
import Main from './Main'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      username: '',
      fullname: '',
      password: ''
    }
    this.handleLogonSubmit = this.handleLogonSubmit.bind(this)

  }
  handleLogonSubmit(data) {
    fetch('https://api.rlksr.com/oauth2/token', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencode',
        'Accept': 'application/json',
      },
      body: 'username=' + data.username + '&password=' + data.password + '&grant_type=password'
    }).then(response => {
      if(!response.ok) {
        throw new Error('Network response was ' + response.status);
      }
      return response.json();
    }).then(ajson => {
      fetch('/naiveuser/users/' + data.username, {
        method: 'GET',
        cache: 'no-cache',
        headers:{
          'pragma': 'no-cache',
          'cache-control': 'no-cache',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + ajson.access_token
        }
      }).then(response => {
        if(response.status === 404) {
          fetch('/naiveuser/users', {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify(data),
            headers:{
              'pragma': 'no-cache',
              'cache-control': 'no-cache',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + ajson.access_token
            }
          }).then(response => {
            if(!response.ok) {
              throw new Error('Network response was ' + response.status);
            }
            return response.json();
          }).then(json => {
            // go to user page
            data.token = ajson.access_token
            this.setState(data);
          }).catch(e => { throw new Error('error creating user') })
          return null;
        }
        if(!response.ok) {
          throw new Error('Network response was ' + response.status);
        }
        return response.json()
      }).then(json => {
        if(json) {
          // go to user page
          data.token = ajson.access_token
          this.setState(data);
        }
      }).catch(e => { throw new Error('error getting user') })
    }).catch(e => { throw new Error('error getting user') })
  }
  render() {
    return (
      <div class="container-fluid App">
        <Header handleLogonSubmit={ this.handleLogonSubmit } token={this.state.token} username={this.state.username} fullname={this.state.fullname} />
        <Main username={this.state.username} token={this.state.token} />
      </div>
    )
  }
}

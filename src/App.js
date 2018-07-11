import React from 'react'
import './App.css'
import Header from './Header'
import Main from './Main'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      fullname: '',
      password: ''
    }
    this.handleLogonSubmit = this.handleLogonSubmit.bind(this)

  }
  handleLogonSubmit(data) {
    fetch('/naiveuser/users/' + data.username, {
      method: 'GET',
      cache: 'no-cache',
      headers:{
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'password': data.password
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
              'Content-Type': 'application/json'
            }
          }).then(response => {
            if(!response.ok) {
              throw new Error('Network response was ' + response.status);
            }
            return response.json();
          }).then(json => {
            // go to user page
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
          this.setState(data);
        }
      }
    ).catch(e => { throw new Error('error getting user') })
  }
  render() {
    return (
      <div class="container-fluid App">
        <Header handleLogonSubmit={ this.handleLogonSubmit } username={this.state.username} fullname={this.state.fullname} />
        <Main username={this.state.username} password={this.state.password} />
      </div>
    )
  }
}

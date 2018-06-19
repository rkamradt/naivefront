import React from 'react'
import './App.css'
import Header from './Header'
import Main from './Main'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleLogonSubmit = this.handleLogonSubmit.bind(this)

  }
  handleLogonSubmit(data) {
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
            this.setState(data);
            console.log('post json returned = ' + JSON.stringify(json))
          }).catch(e => { throw new Error('error in POST') })
          return null;
        }
        return response.json()
      }).then(json => {
        if(json) {
          // go to user page
          this.setState(data);
          console.log('get json returned = ' + JSON.stringify(json))
        }
      }
    ).catch(e => { throw new Error('error in GET') })
  }
  render() {
    return (
      <div class="container-fluid App">
        <Header handleLogonSubmit={ this.handleLogonSubmit } username={this.state.username} password={this.state.password} />
        <Main username={this.state.username} password={this.state.password} />
      </div>
    )
  }
}

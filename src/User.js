import React from 'react'
import './User.css'
import AccountList from './AccountList'
import CreateAccount from './CreateAccount'


export default class User extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      user: {
        username: '',
        fullname: '',
        email: '',
        password: '',
        accounts: []
      },
    }
    this.fetchState = this.fetchState.bind(this)
  }
  componentDidMount() {
    this.fetchState();
  }
  fetchState() {
    fetch('/naiveuser/users/'+this.props.username, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'password': this.props.password
      }
    }).then(response => response.json())
      .then(data => this.setState({ user: data }))
  }
  render() {
     return (
      <div class='User' >
        <table class='table' >
        <caption>User info</caption>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.user.username}</td>
              <td>{this.state.user.fullname}</td>
              <td>{this.state.user.email}</td>
            </tr>
          </tbody>
        </table>
        <AccountList accounts={this.state.user.accounts} />
        <CreateAccount username={this.props.username} password={this.props.password} update={this.fetchState}/>
      </div>
     )
  }
}

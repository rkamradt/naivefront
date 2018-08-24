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
        accountDetails: []
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
      cache: 'no-cache',
      headers:{
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.props.token
      }
    }).then(response => {
      if(!response.ok) {
        throw new Error('Network response was ' + response.status);
      }
      return response.json()
    }).then(data => {
        data.accountDetails = []
        this.setState({user: data})
        data.accounts.forEach(d => {
          fetch('/naiveuser/users/'+this.props.username+'/accounts/'+d, {
            method: 'GET',
            cache: 'no-cache',
            headers:{
              'pragma': 'no-cache',
              'cache-control': 'no-cache',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authentication': 'bearer: ' + this.props.token
            }
          }).then(response => {
            if(!response.ok) {
              throw new Error('Network response was ' + response.status);
            }
            return response.json()
          }).then(a => {
            data.accountDetails.push(a)
            this.setState({user: data})
          }).catch(e => { throw new Error('error getting account details') })
        })
      }).catch(e => { throw new Error('error getting user details') })
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
        <AccountList accountDetails={this.state.user.accountDetails} username={this.props.username} token={this.props.token} update={this.fetchState}/>
        <CreateAccount username={this.props.username} token={this.props.token} update={this.fetchState}/>
      </div>
     )
  }
}

import React, { Component } from 'react'
import './Logon.css'


export default class Logon extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      username: this.refs.username.value,
      fullname: this.refs.fullname.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    })
    this.props.handleLogonSubmit(data);
  }
  render() {
    return (
      <div className="Logon">
      <h1 className="LogonHeader">Logon or Signup</h1>
      <form onSubmit={this.handleSubmit}>
        <h2 >Please sign in or sign up</h2>
        <label >User Name</label>
        <input type='text' ref='username' placeholder='Username' required='true' autoFocus='true' />
        <label >Email address</label>
        <input type='text' ref='fullname' placeholder='Full Name' required='false' />
        <label >Email address</label>
        <input type='email' ref='email' placeholder='Email address' required='false' />
        <label >Password</label>
        <input type='password' ref='password' required='true' />
        <button type='submit' className='btn btn-lg btn-primary btn-block'>Sign in</button>
      </form>
      </div>
    )
  }
}

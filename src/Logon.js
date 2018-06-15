import React, { Component } from 'react'
import './Logon.css'


export default class Logon extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.refs.username.value,
      fullname: this.refs.fullname.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.handleLogonSubmit(data);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 >Please sign in or sign up</h2>
        <label >User Name</label>
        <input type='text' ref='username' placeholder='Username' required autoFocus='true' />
        <label >Full Name</label>
        <input type='text' ref='fullname' placeholder='Full Name' />
        <label >Email address</label>
        <input type='email' ref='email' placeholder='Email address' />
        <label >Password</label>
        <input type='password' ref='password' required />
        <button type='submit' className='btn btn-lg btn-primary btn-block'>Sign in</button>
      </form>
    )
  }
}

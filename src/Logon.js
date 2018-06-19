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
      <form class='form-inline Logon' onSubmit={this.handleSubmit}>
        <h2 class='LogonHeader'>Please sign in or sign up</h2>
        <div class='form-group LogonGroup'>
          <label class='LogonLabel' >User Name</label>
          <input type='text' class='form-control' ref='username' placeholder='Username' required autoFocus='true' />
        </div>
        <div class='form-group LogonGroup'>
          <label class='LogonLabel' >Full Name</label>
          <input type='text' class='form-control' ref='fullname' placeholder='Full Name' />
        </div>
        <div class='form-group LogonGroup'>
          <label class='LogonLabel' >Email address</label>
          <input type='email' class='form-control' ref='email' placeholder='Email address' />
        </div>
        <div class='form-group LogonGroup'>
          <label class='LogonLabel' >Password</label>
          <input type='password' class='form-control' ref='password' required />
        </div>
        <button type='submit' className='btn btn-default'>Sign in</button>
      </form>
    )
  }
}

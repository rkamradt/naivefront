import React from 'react'
import './Header.css'
import Logon from './Logon'


export default class Header extends React.Component {
  render() {
    // todo check if token is valid
    if (!this.props.token || this.props.token === "") {
      return <Logon handleLogonSubmit={ this.props.handleLogonSubmit } />
    } else {
      return <h3>Welcome {this.props.fullname||this.props.username}</h3>
    }
  }
}

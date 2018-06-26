import React from 'react'
import './Header.css'
import Logon from './Logon'


export default class Header extends React.Component {
  render() {
    if (this.props.username === "") {
      return <Logon handleLogonSubmit={ this.props.handleLogonSubmit } />
    } else {
      return <h3>Welcome {this.props.fullname||this.props.username}</h3>
    }
  }
}

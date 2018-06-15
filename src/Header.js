import React from 'react'
import './Header.css'
import Logon from './Logon'


export default class Header extends React.Component {
  render() {
    if (this.props.username === "") {
      return <Logon handleLogonSubmit={ this.props.handleLogonSubmit } username={this.props.username} password={this.props.password}/>
    } else {
      return <h3>Welcome {this.props.username}</h3>
    }
  }
}

import React from 'react';
import './Main.css';
import Blocks from './Blocks'
import User from './User'

export default class Main extends React.Component {
  render() {
    // todo validate token
    if(!this.props.token || this.props.token === "") {
      return <h1>Approach and Identify Yourself</h1>
    } else if(this.props.username === "admin") { // poor man's roles
      return <Blocks token={this.props.token}/>
    } else {
      return <User username={this.props.username} token={this.props.token} />
    }
  }
}

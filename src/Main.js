import React from 'react';
import './Main.css';
import Blocks from './Blocks'
import User from './User'

export default class Main extends React.Component {
  render() {
    if(this.props.username === "") {
      return <h1>Approach and Identify Yourself</h1>
    } else if(this.props.username === "admin") { // poor man's roles
      return <Blocks />
    } else {
      return <User username={this.props.username} password={this.props.password} />
    }
  }
}

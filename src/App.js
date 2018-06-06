import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import List from './List'
import Post from './Post'

class App extends Component {
  render() {
    return (
      <div>
      <List />
      <Post />
      </div>
    )
  }
}

export default App

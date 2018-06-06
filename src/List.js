import React, { Component } from 'react'

export default class List extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      ids: [],
    };
  }
  componentDidMount() {
    fetch('/api')
      .then(response => response.json())
      .then(data => this.setState({ ids: data }))
  }

  render() {
     return (
       <div>
       {this.state.ids.map(function(d, idx){
          return (<li key={idx}>{d}</li>)
        })}
       </div>
     )
  }
}

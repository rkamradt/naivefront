import React, { Component } from 'react'

export default class Post extends React.Component {
  constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit(event) {
     event.preventDefault()
     const data = new FormData(event.target)

     fetch('/api/', {
       method: 'POST',
     })
   }
  render() {
     return (
       <form onSubmit={this.handleSubmit}>
         <button>Post!</button>
       </form>
     );
   }
}

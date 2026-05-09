import React from 'react'
import './CreateAccount.css'

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log('in constructor props = ' + JSON.stringify(props))
  }

  handleSubmit(event) {
   event.preventDefault()
   console.log('in handle submit props = ' + JSON.stringify(this.props))


   fetch('/naiveuser/users/'+this.props.username+'/accounts', {
     method: 'POST',
     cache: 'no-cache',
     headers:{
       'pragma': 'no-cache',
       'cache-control': 'no-cache',
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.props.token
     }
   }).then(response => {
     this.props.update(); // update the list with the new account
   })
  }
  render() {
    console.log('in render props = ' + JSON.stringify(this.props))
    return (
     <form className='CreateAccountForm' onSubmit={this.handleSubmit}>
       <button type='submit'>Create Account</button>
     </form>
    );
  }
}

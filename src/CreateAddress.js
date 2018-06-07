import React from 'react'
import './CreateAddress.css'

export default class CreateAddress extends React.Component {
  constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit(event) {
     event.preventDefault()

     fetch('/api/operator/wallets', {
       method: 'POST',
       headers:{
         'Content-Type': 'application/json'
       }
     })
   }
  render() {
     return (
       <form className='CreateAddressForm' onSubmit={this.handleSubmit}>
         <button type='submit'>Create Address</button>
       </form>
     );
   }
}

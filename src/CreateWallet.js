import React from 'react'
import './CreateWallet.css'

export default class CreateWallet extends React.Component {
  constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit(event) {
     event.preventDefault()

     const data = JSON.stringify({
       // don't like having the value as state, when it's strictly one-way
       password: this.refs.password.value
     })
     fetch('/api/operator/wallets', {
       method: 'POST',
       body: data,
       headers:{
         'Content-Type': 'application/json'
       }
     })
   }
  render() {
     return (
       <form className='CreateWalletForm' onSubmit={this.handleSubmit}>
         <label htmlFor='inputPassword'>Wallet Password</label>
         <input type='password' ref='password' className='form-control' required='true' />
         <button type='submit'>Create Wallet</button>
       </form>
     );
   }
}

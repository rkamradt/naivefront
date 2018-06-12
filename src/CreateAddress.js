import React from 'react'
import './CreateAddress.css'

export default class CreateAddress extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
   event.preventDefault()

   fetch('/naivecoin/operator/wallets/'+this.props.walletId+'/addresses', {
     method: 'POST',
     headers:{
       'Content-Type': 'application/json',
       'password': this.refs.password.value
     }
   })
  }
  render() {
    return (
     <form className='CreateAddressForm' onSubmit={this.handleSubmit}>
       <label htmlFor='inputPassword'>Wallet Password</label>
       <input type='password' ref='password' className='form-control' required='true' />
       <button type='submit'>Create Address</button>
     </form>
    );
  }
}

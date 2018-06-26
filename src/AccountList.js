import React from 'react'
import './AccountList.css'
import Transfer from './Transfer'

export default class AccountList extends React.Component {
  constructor (props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    fetch('/naiveuser/users/'+this.props.username+'/accounts/'+event.target.id+'/mine', {
      method: 'POST',
      cache: 'no-cache',
      headers:{
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'password': this.props.password
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was ' + response.status);
      }
      return response.json()
    })
    .then(data => {
      console.log("created block with hash " + data.hash)
      this.props.update(); // update the list with the new balance
    })
    .catch(e => { throw new Error('error mining coin') })
  }
  render() {
     return (
       <div class='AccountList' >
          <table class='table' >
           <caption>Accounts</caption>
             <thead>
               <tr>
                 <th>Account Number</th>
                 <th>Address Id</th>
                 <th>Balance</th>
               </tr>
             </thead>
             <tbody>
               {
                 this.props.accountDetails.map(d => {
                  return (
                    <tr className='AccountListRow' >
                      <td>{d.id}</td>
                      <td>{d.addressId.substring(0,10)}</td>
                      <td>{d.balance/1000000000}</td>
                      <td>
                        <form id={d.id} onSubmit={this.handleSubmit}>
                          <button type='submit'>Mine</button>
                        </form>
                      </td>
                      <td>
                        <Transfer  username={this.props.username} password={this.props.password} accountId={d.id} accountDetails={this.props.accountDetails} update={this.props.update}/>
                      </td>
                    </tr>)
                })}
             </tbody>
          </table>
       </div>
     )
  }
}

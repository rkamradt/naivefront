import React from 'react'
import './AddressList.css'

export default class AddressList extends React.Component {
  constructor (props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = JSON.stringify({
      rewardAddress: event.target.id
    })
    fetch('/naivecoin/miner/mine', {
      method: 'POST',
      body: data,
      cache: 'no-cache',
      headers:{
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then(response => response.json())
    .then(data => console.log("created block with hash " + data.hash))
  }
  render() {
     return (
       <div className='AddressList'>
       {this.props.addresses.map(d => {
          return (
            <div className='AddressListRow' >
              <div>address id {d.substring(0,10)}</div>
              <form id={d} onSubmit={this.handleSubmit}>
                <button type='submit'>Mine</button>
              </form>
            </div>)
        })}
       </div>
     )
  }
}

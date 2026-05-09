import React from 'react'
import './WalletList.css'
import AddressList from './AddressList'
import CreateAddress from './CreateAddress'

export default class WalletList extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      ids: [],
    };
  }
  componentDidMount() {
    fetch('/naivecoin/operator/wallets', {
      method: 'GET',
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
      .then(data => this.setState({ ids: data }))
  }
  render() {
     return (
       <div className='WalletList'>
       {this.state.ids.map(d => { return (
              <div className='WalletListRow' >
              <div>wallet id {d.id.substring(0,10)}</div>
              <AddressList addresses={d.addresses} token={this.props.token}/>
              <CreateAddress walletId={d.id} token={this.props.token}/>
              </div>
          )})
        }
       </div>
     )
  }
}

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
    fetch('/api/operator/wallets')
      .then(response => response.json())
      .then(data => this.setState({ ids: data }))
  }
  render() {
     return (
       <div className='WalletList'>
       {this.state.ids.map(d => { return (
              <div className='WalletListRow' >
              <div>wallet id {d.id.substring(0,10)}</div>
              <AddressList addresses={d.addresses} />
              <CreateAddress walletId={d.id}/>
              </div>
          )})
        }
       </div>
     )
  }
}

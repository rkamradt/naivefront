import React, { Component } from 'react'
import './WalletsAndAddresses.css'
import CreateWallet from './CreateWallet'
import WalletList from './WalletList'

export default class WalletsAndAddresses extends Component {
  render() {
    return (
      <div className="WalletAndAddresses">
      <h1 className="WalletAndAddressesHeader">Wallets and Addresses</h1>
      <WalletList />
      <CreateWallet />
      </div>
    )
  }
}

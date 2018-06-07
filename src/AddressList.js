import React from 'react'
import './AddressList.css'

export default class AddressList extends React.Component {
  constructor (props){
    super(props)
  }

  render() {
     return (
       <div className='AddressList'>
       {this.props.addresses.map(function(d, idx){
          return (<li className='AddressListRow' key={idx}>id {d.id}</li>)
        })}
       </div>
     )
  }
}

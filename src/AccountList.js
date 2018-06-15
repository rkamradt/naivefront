import React from 'react'
import './AccountList.css'

export default class AccountList extends React.Component {
  render() {
     return (
       <div className='AccountList'>
       {this.props.accounts.map(d => {
          return (
            <div className='AccountListRow' >
              <div>address number {d}</div>
            </div>)
        })}
       </div>
     )
  }
}

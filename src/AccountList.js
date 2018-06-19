import React from 'react'
import './AccountList.css'

export default class AccountList extends React.Component {
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
               {this.props.accounts.map(d => {
                  return (
                    <tr className='AccountListRow' >
                      <td>{d}</td>
                      <td>{d}</td>
                      <td>{d}</td>
                    </tr>)
                })}
             </tbody>
          </table>
       </div>
     )
  }
}

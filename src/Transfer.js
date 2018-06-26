import React from "react";
import './Transfer.css'
import Popup from "reactjs-popup";

export default class Transfer extends React.Component {
    constructor (props){
      super(props)
      this.state = {toAccount: '', amount: 0}
      this.onTransfer = this.onTransfer.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }
    onTransfer() {
      console.log('ref = ' + JSON.stringify(this.refs))
      const data = JSON.stringify({
        toAccount: this.state.toAccount,
        amount: this.state.amount*1000000000
      })
      fetch('/naiveuser/users/'+this.props.username+'/accounts/'+this.props.accountId+'/transfer', {
        method: 'POST',
        body: data,
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
  <Popup trigger={<button className="button"> Transfer </button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Transfer Naive Coin </div>
        <div className="actions">
        <label >To Account:</label>
        <select name='toAccount' onChange={this.handleChange} >
        {
          this.props.accountDetails.map(d => {
           return (
             <option value ={d.id}>{d.id}</option>
           )
        })}
        <option value='none' selected>--Choose an Account--</option>
        </select>
        <label >Amount:</label>
        <input type='number' name='amount' value={this.state.amount} onChange={this.handleChange}/>
        <button
            className="button"
            onClick={() => {
              this.onTransfer();
              close()
            }}
          >
            Transfer
        </button>
      </div>
      </div>
    )}
  </Popup>
)
}
}

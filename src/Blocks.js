import React from 'react'
import './Blocks.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const getTransactionData = (data) => {
  return data.inputs.map(i => {
    return {
      type: 'input',
      transaction: i.transaction.substring(0,10),
      index: i.index,
      amount: i.amount/1000000000,
      address: i.address.substring(0,10),
      signature: i.signature.substring(0,10)
    }
  }).concat(data.outputs.map(i => {
    return {
      type: 'output',
      transaction: '',
      index: '',
      amount: i.amount/1000000000,
      address: i.address.substring(0,10),
      signature: ''
    }
  }))
}

export default class Blocks extends React.Component {
  constructor (props){
    super(props)
    this.state = []
    this.fetchState = this.fetchState.bind(this)
  }
  componentDidMount() {
    this.fetchState();
  }
  fetchState() {
    fetch('/naivecoin/blockchain/blocks', {
      method: 'GET',
      cache: 'no-cache',
      headers:{
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(response => {
      if(!response.ok) {
        throw new Error('Network response was ' + response.status);
      }
      return response.json()
    }).then(data => {
        this.setState({
          data: data.map(d => {
            return {
              index: d.index,
              previousHash: d.previousHash.substring(0,10),
              timestamp: d.timestamp,
              nonce: d.nonce/1000000000,
              transactionNumber: d.transactions.length,
              hash: d.hash.substring(0,10),
              transactions: d.transactions.map(t => {
                return {
                  id: t.id.substring(0,10),
                  hash: t.hash.substring(0,10),
                  type: t.type,
                  data: getTransactionData(t.data)
                }
              })
            }
          })
        })
    }).catch(e => { throw new Error('error getting user details') })
  }
  render() {
     const { data } = this.state;
     return (
       <div>
         <ReactTable
           data={data}
           columns={[
             {
               Header: "Blocks",
               columns: [
                 { Header: "Index", accessor: "index" },
                 { Header: "Previous Hash", accessor: "previousHash" },
                 { Header: "Timestamp", accessor: "timestamp" },
                 { Header: "Nonce", accessor: "nonce" },
                 { Header: "# Transactions", accessor: "transactionNumber" },
                 { Header: "Hash", accessor: "hash" }
               ]
             }
           ]}
           defaultPageSize={10}
           className="-striped -highlight"
           SubComponent={block => {
             const { transactions } = block.original;
             return (
               <div style={{ padding: "20px" }}>
                 <ReactTable
                   data={transactions}
                   columns={[
                     {
                       Header: "Transactions",
                       columns: [
                         { Header: "Id", accessor: "id" },
                         { Header: "Hash", accessor: "hash" },
                         { Header: "Type", accessor: "type" }
                       ]
                     }
                   ]}
                   defaultPageSize={4}
                   showPagination={false}
                   SubComponent={transaction => {
                     const { data } = transaction.original;
                     return (
                       <div style={{ padding: "20px" }}>
                         <ReactTable
                           data={data}
                           columns={[
                             {
                               Header: "Inputs/Outputs",
                               columns: [
                                 { Header: 'Type', accessor: 'type' },
                                 { Header: 'Transaction', accessor: 'transaction' },
                                 { Header: 'Index', accessor: 'index' },
                                 { Header: 'Amount', accessor: 'amount' },
                                 { Header: 'Address', accessor: 'address' },
                                 { Header: 'Signature', accessor: 'signature' }
                               ]
                             }
                           ]}
                           defaultPageSize={6}
                           showPagination={false}
                         />
                       </div>
                     );
                   }}
                 />
               </div>
             );
           }}
         />
       </div>
     )
   }
}

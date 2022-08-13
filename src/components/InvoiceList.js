import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
// state for Invoice list 

function InvoiceList(props) {
 

  let handelDelete =(id)=>{
    axios.delete(`http://127.0.0.1:8000/invoice/${id}`,{headers:{
      "Content-Type": "multipart/form-data"
  } }).then(()=>{
      props.load_list()
    })
  }

  useEffect(()=>{
    props.load_list()
    
  },[])
  return (
    <div>
      <Table striped hover size="sm" style={{width:'80%', margin:'auto'}}>
      <thead>
        <tr>
          <th>Invoice Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
          props.List_invoice.map(item=>{
            return(<>
            {
              <tr>
                <td>{item.invoice_title}</td>
                <td><Link to={`/${item.id}`}><Button variant="primary" >Open</Button></Link></td>
                <td><Button variant="danger" onClick={()=>handelDelete(item.id)}>Delete</Button></td>
              </tr>
            }
            </>)
          })
        }

        
        
      </tbody>
    </Table>
        
    </div>
  )
}

export default InvoiceList
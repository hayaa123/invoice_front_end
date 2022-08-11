import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table ,Button} from 'react-bootstrap'

// state for Invoice list 

function InvoiceList() {
  let [List_invoice, setList_invoice] = useState([1])
  
  let load_list =()=>{
    axios.get("http://127.0.0.1:8000/invoice/").then((response)=>
        {
            // console.log()
            setList_invoice(response.data)
        }
    )
  }

  let handelDelete =(id)=>{
    axios.delete(`http://127.0.0.1:8000/invoice/${id}`,{headers:{
      "Content-Type": "multipart/form-data"
  } }).then(()=>{
      load_list()
    })
  }

  useEffect(()=>{
    load_list()
    
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
          List_invoice.map(item=>{
            return(<>{
              <tr>
              <td>{item.invoice_title}</td>
              <td><Button variant="primary">Open</Button></td>
              <td><Button variant="danger" onClick={()=>handelDelete(item.id)}>Delete</Button></td>
            </tr>
            }</>)
          })
        }

        
        
      </tbody>
    </Table>
        
    </div>
  )
}

export default InvoiceList
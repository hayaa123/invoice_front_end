import axios from 'axios';
import React, { useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { Table } from 'react-bootstrap';
function InvoiceDetail() {
    let {id} = useParams();
    let [invoice,setInvoice] = useState();
    let [expense_items,setExpense_items] = useState()
    
    let list_item = ""
    let load_Invoice_data = ()=>{
        axios.get(`http://127.0.0.1:8000/invoice/${id}`).then((response)=>{
            setInvoice(response.data)
            load_expense_item(response.data.expense_items)
        })
    
        
    }

    let load_expense_item = (expense_id)=>{
        let expense_objs = []
        expense_id.map(item=>{
            axios.get(`http://127.0.0.1:8000/invoice/expense_item/${item}/`)
            .then((response)=>{

                expense_objs.push(response.data)
            }
            
            )

        })

        setExpense_items(expense_objs)

        
    }


    useLayoutEffect(()=>{
        load_Invoice_data()

    },[])


  return (
    <>
    {invoice && <>
        <h1>{invoice.invoice_title}</h1>
        
    
         </> 
     
         }
         
        
        
    {expense_items && <>
        <Table striped hover size="sm" style={{width:'80%', margin:'auto'}}>
      <thead>
        <tr>
          <th>item name</th>
          <th>amount</th>
        </tr>
      </thead>
      <tbody>
            {expense_items.map(item=>{
            
                return (
                    <>
                    <tr>
                        <td>item2</td>
                        <td></td>     
                    </tr>
                    </>
                    

                )
             
            })}    
      </tbody>
    </Table>
    </>}
    </>
  )
}

export default InvoiceDetail
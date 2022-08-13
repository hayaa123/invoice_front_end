import FormInvoice from './FormInvoice'
import InvoiceList from './InvoiceList'
import React, { useState } from 'react'
import axios from 'axios';

function HomePage() {
  let [List_invoice, setList_invoice] = useState([1])
  
  let load_list =()=>{
    axios.get("http://127.0.0.1:8000/invoice/").then((response)=>
        {
            // console.log()
            setList_invoice(response.data)
        }
    )
  }
  return (
    <>
        <FormInvoice load_list={load_list}/>
        <InvoiceList List_invoice={List_invoice} load_list={load_list}/>
    </>
  )
}

export default HomePage
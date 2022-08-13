import axios from 'axios';
import React, { useEffect  } from 'react'
import { useParams ,useNavigate  } from 'react-router-dom'
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
function InvoiceDetail() {
    let {id} = useParams();
    let [invoice,setInvoice] = useState();
    let [expense_items,setExpense_items] = useState()
    let navigate = useNavigate()

    let download_as_pd =()=>{
        axios({
            url:`http://127.0.0.1:8000/invoice/${id}/pdf/`,
            method: "GET",
            responseType:"blob"
    })
    }

    let handelDelete =()=>{
        axios.delete(`http://127.0.0.1:8000/invoice/${id}`,{headers:{
          "Content-Type": "multipart/form-data"
      } }).then(()=>{
        navigate("/")
        })
      }

    let load_Invoice_data = ()=>{
        axios.get(`http://127.0.0.1:8000/invoice/${id}`).then((response)=>{
            setInvoice(response.data)
            load_expense_item(response.data.expense_items)
        }) 
    }

    let load_expense_item = async(expense_id)=>{
        let arr = await expense_id.map((item)=>{
            let res =  axios.get(`http://127.0.0.1:8000/invoice/expense_item/${item}/`)
            return res.then((response)=> response)
        }
        )
        setExpense_items(arr)        
    }

    useEffect(()=>{
        load_Invoice_data()

    },[])


  return (
    <div style = {{width:'80%' ,margin:"auto", marginTop:"100px"}}>
    {invoice && <div >
        <div style = {{float: 'right', width:'30%', display:'flex', justifyContent: 'space-between'}}>
            <Button variant="success" onClick={download_as_pd}>Download as Pdf</Button>
            <Button>Update</Button>
            <Button variant="danger" onClick={handelDelete}>Delete</Button>
        </div>
        <h1>{invoice.invoice_title}</h1>
        <p>{invoice.date}</p>

         </div> 
     
         }
         
        
        
    {expense_items && <> 
        <h4>Expense Items</h4>
        {console.log(expense_items)}

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
                        <td>item {item.name}</td>
                        <td></td>     
                    </tr>
                    </>
                    

                )
             
            })}    
      </tbody>
    </Table>
    </>}
    </div>
  )
}

export default InvoiceDetail
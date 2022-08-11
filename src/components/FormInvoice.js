// import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Plus } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


function FormInvoice() {

  const [expenseItemsCount, setexpenseItemsCount] = useState([1]);
  const [expenseItems, setexpenseItems] = useState([])
  let add_to_expense_count = ()=>{
    setexpenseItemsCount([...expenseItemsCount,1])
    
  }

  let submitFormHandeler =async(e)=>{

    e.preventDefault();
    let arr = []
    let expense_names=e.target.expense_name  
    let expense_amt = e.target.expense_amt
    for(let i=0; i<expense_names.length; i++){
        let item_dict = {}
        item_dict["expense_names"]= expense_names[i].value
        item_dict["expense_amt"]=expense_amt[i].value
        arr.push(item_dict)        
    }
    await setexpenseItems(arr)
    console.log(e.target.invoice_image.files[0]);
    await axios.post("http://127.0.0.1:8000/invoice/",
    {
      invoice_title: e.target.invoice_title.value,
      receipt_image: e.target.invoice_image.files[0],
      date: e.target.invoice_date.value,
      expense_items: []

    },
    {
    headers:{
        "Content-Type": "multipart/form-data"
    } 
    }

    )


    expenseItems.map ( 
      axios.post()
    )
  }

  return (
    <Form style = {{width:"50%",margin:"auto"}} onSubmit={submitFormHandeler}>
    <Form.Group className="mb-3" controlId="invoice_title">
      <Form.Label>Invoice Title</Form.Label>
      <Form.Control type="text"  />

    </Form.Group>

    <Form.Group className="mb-3" controlId="invoice_image">
      <Form.Label>Invoice image</Form.Label>
      <Form.Control type="file" placeholder="file" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="invoice_date">
      <Form.Label>Date of Invoice</Form.Label>
      <Form.Control type="date"  placeholder="Date of Invoice" />
    </Form.Group>
    <Form.Label>Expense Item</Form.Label>

    { expenseItemsCount.map(item =>{return (<>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3 " controlId="expense_name">
            <Form.Label>item className</Form.Label>
            <Form.Control type="text"   />
            </Form.Group>    
          </Col>
          <Col>
            <Form.Group className="mb-3 " controlId="expense_amt">
            <Form.Label>item mount</Form.Label>
            <Form.Control type="number" />
            </Form.Group>  
          </Col>
        </Row>

      </Container>
      
        </>)
        }
    )}
    <Button style={{display:"block",margin: "auto"}} onClick={add_to_expense_count}>
        <Plus color='white' size={30} type="button" />
    </Button>
    {/* <Plus color='blue' size={30} type="button"  )}/> */}

    <Button variant="primary" type="submit" >
      Submit
    </Button >
  </Form>
  )
}

export default FormInvoice
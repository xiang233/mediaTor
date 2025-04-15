import React, {useState, useEffect} from 'react'
import FormContainer from '../../components/general/FormContainer';
import {Row, Col, Form, Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import StepperContainer from '../../components/general/StepperContainer';
function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] =useState('Paypal');
    const navigate = useNavigate();
    function paymentSubmitHandler(e) {
        console.log(paymentMethod)
        e.preventDefault();
        localStorage.setItem("paymentMethod", paymentMethod);
        navigate("/place_order/");
        return;
      }
  return (
    <StepperContainer step={1}>
  
    <FormContainer>
        <Form onSubmit = {paymentSubmitHandler}>
    <h2>Payment Method</h2>
       
          {/* <Form.Control value = {paymentMethod} onChange={(e)=>setPaymentMethod}> */}
          <Form.Check
            label="Paypal"
            name="group"
            type={'radio'}
            onChange = {()=>{setPaymentMethod("Paypal")}}
          />
          <Form.Check
            label="Stripe"
            name="group"
            type={'radio'}
            onChange = {()=>{setPaymentMethod("Stripe")}}
          />
          <Form.Check
            label="Credit Card"
            name="group"
            type={'radio'}
            onChange = {()=>{setPaymentMethod("Credit Card")}}
          />
          <Button variant="primary" type="submit" >
          Continue
        </Button>
          </Form>
        </FormContainer>
        </StepperContainer>

  )
}

export default PaymentScreen
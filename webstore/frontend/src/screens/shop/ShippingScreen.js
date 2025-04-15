import React, {useRef, useState} from "react";
import FormContainer from "../../components/general/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StepperContainer from "../../components/general/StepperContainer";

function ShippingScreen() {
  const addressInput = useRef(null);
  const cityInput = useRef(null);
  const countryInput = useRef(null);
  const zipInput = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function addressSubmitHandler(e) {
    e.preventDefault();
    const address_instance = {
      address: addressInput.current.value,
      city: cityInput.current.value,
      country: countryInput.current.value,
      zip: zipInput.current.value,
    };
    localStorage.setItem("shippingAddress", JSON.stringify(address_instance));
    navigate("/shop/payment/");
    return;
  }
  return (
    <StepperContainer>
    <FormContainer>
      <Form onSubmit={addressSubmitHandler}>
        <Form.Group className="mb-3" >
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            ref={addressInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            ref={cityInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip code"
            ref={zipInput}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            ref={countryInput}
            required
          />
        </Form.Group>
        <Form.Text>{message}</Form.Text>
        <Button variant="primary" type="submit" >
          Continue
        </Button>
      </Form>
    </FormContainer>
    </StepperContainer>
  );
}

export default ShippingScreen;

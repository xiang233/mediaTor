import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import CartItemCard from "../../components/shop/CartItemCard";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepperContainer from "../../components/general/StepperContainer";
import { getCookie } from "../../services/getCookie";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
function PlaceOrderScreen() {
  const navigate = useNavigate();
  const shipping = JSON.parse(localStorage.getItem("shippingAddress"));
  const payment_method = localStorage.getItem("paymentMethod");
  const cart_items = JSON.parse(localStorage.getItem("cartItems"));
  const { isLoggedIn, loggedUser } = useAuth();
  var user_id = null;
  const [costs, setCosts] = useState({});
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  if (shipping == null || Object.keys(shipping).length == 0) {
    navigate("/shop/shipping/");
  }
  if (payment_method == null) {
    navigate("/shop/payment/");
  }
  if (cart_items == null || Object.keys(cart_items).length == 0) {
    navigate("/shop/cart/");
  }
  if (isLoggedIn == false) {
    navigate("/shop/login/");
  } else {
    user_id = loggedUser["id"];
  }
  function placeOrderHandler() {
    postOrder();
  }

  useEffect(() => {
    computeTotal();
  });
  function computeTotal() {
    var t = 0;
    for (let key in costs) {
      console.log(key, costs[key]);
      t += costs[key];
    }
    setTotal(t);
  }

  async function postOrder() {
    var csrftoken = getCookie("csrftoken");
    console.log(csrftoken);
    const order_instance = {
      paymentMethod: payment_method,
      taxPrice: (total * 0.04).toFixed(2),
      shippingPrice: 10,
      totalPrice: total,
      user_id: user_id,
      shippingAddress: {
        city: shipping.city,
        country: shipping.country,
        zip: shipping.zip,
        address: shipping.address,
      },
    };
    console.log({
      paymentMethod: payment_method,
      taxPrice: (total * 0.04).toFixed(2),
      shippingPrice: 10,
      totalPrice: total,
    });

    axios
      .post("http://localhost:8000/api/create_order/", order_instance, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      })
      .then(function (response) {
        setMessage("Order Created");
        navigate("/shop/");
      })
      .catch(function (error) {
        if (error.response.data.message) {
          setMessage(error.response.data.message);
        }
      });
  }

  return (
    <StepperContainer step={2}>
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Heading>Shippping</Heading>
            </ListGroupItem>
            <ListGroupItem>
              {shipping.address}, {shipping.city}, {shipping.zip},{" "}
              {shipping.country}
            </ListGroupItem>

            <ListGroupItem>
              <Heading>Payment Method</Heading>
            </ListGroupItem>
            <ListGroupItem>{payment_method}</ListGroupItem>

            <ListGroupItem>
              <Heading>Order Items</Heading>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroup>
                {Object.entries(cart_items).map(([item, count], i) => {
                  return (
                    <CartItemCard
                      item={parseInt(item)}
                      count={parseInt(count)}
                      key={i}
                      is_checkout={true}
                      setTotal={setCosts}
                    ></CartItemCard>
                  );
                })}
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>${total}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col sm={4}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Items:</Col>
                <Col>${total.toFixed(2)}</Col>
              </Row>

              <Row>
                <Col>Shipping:</Col>
                <Col>${(10).toFixed(2)}</Col>
              </Row>
              <Row>
                <Col>Tax:</Col>
                <Col>${(total * 0.04).toFixed(2)}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Payment amount:</Col>
                <Col>${(total * 1.04 + 10).toFixed(2)}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Button onClick={placeOrderHandler} variant="primary" size="lg">
                Place Order
              </Button>
            </ListGroupItem>
            <ListGroupItem>{message}</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </StepperContainer>
  );
}

export default PlaceOrderScreen;

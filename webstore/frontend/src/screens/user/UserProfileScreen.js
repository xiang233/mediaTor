import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {Row, Col} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
function UserProfileScreen() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedUser } = useAuth();
  const [orders, setOrders] = useState(null);
  async function fetchUserOrders(id) {
    const { data } = await axios.get(
      `http://localhost:8000/api/users/${id}/orders`
    );
    setOrders(data);
    console.log("data", data);
  }
  useEffect(() => {
    console.log("header useEffect");
    console.log("logged user", loggedUser);
    console.log("orders", orders);
    if (isLoggedIn) {
      fetchUserOrders(loggedUser.id);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Heading>{loggedUser.username}</Heading>
          <Heading>orders:</Heading>
          {orders && Object.keys(orders).length > 0 && (
            <ListGroup>
              {orders.map((order, i) => (
                <ListGroupItem key = {i}>
                 <Row>
                    <Col>Created time</Col>
                  <Col>{order.createdTime}</Col>
                  </Row>
                  <Row>
                    <Col>Total price</Col>
                  <Col>{order.totalPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Delivered</Col>
                  <Col>{order.isDelivered==true?"True":"False"}</Col>
                  </Row>
                  <Row>
                    <Col>Paid</Col>
                  <Col>{order.isPaid==true?"True":"False"}</Col>
                  </Row>
                </ListGroupItem>
              ))}{" "}
            </ListGroup>
          )}
        </>
      ) : (
        <>Logged out</>
      )}
    </>
  );
}

export default UserProfileScreen;

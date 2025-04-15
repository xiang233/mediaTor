import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Image, Form } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function MediaDetailScreen() {
  const theme = createTheme();
  const navigate = useNavigate();
  var { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Row>
          <Col sm={5}>
            <Image src={product.image} width="100%"></Image>
          </Col>
          <Col sm={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
              </ListGroupItem>
              <ListGroupItem>{product.price}</ListGroupItem>

              <ListGroupItem>{product.description}</ListGroupItem>
              <ListGroupItem></ListGroupItem>
            </ListGroup>
          </Col>
          <Col sm={3}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroupItem>
              
            </ListGroup>
          </Col>
        </Row>
      </ThemeProvider>
    </>
  );
}

export default MediaDetailScreen;

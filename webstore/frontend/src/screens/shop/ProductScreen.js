import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Image, Form } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
function ProductScreen() {
  const theme = createTheme();
  const navigate = useNavigate();
  var { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(`/api/products/${id}/`);
      setProduct(data);
    }
    fetchProducts();
  }, []);

  function addToCartHandler() {
    console.log("add to cart handler")
    const cart_items = JSON.parse(localStorage.getItem('cartItems'));
    console.log(cart_items[id])
    if (cart_items==null || Object.keys(cart_items).length ==0) {
      console.log("adding", id, "null cart")
      localStorage.setItem('cartItems', JSON.stringify({[id]:parseInt(quantity)}))
    } else if (cart_items[id] != undefined){
      console.log("adding", id, "has same key")
      var current_cart_items = cart_items;
      const new_quantity = parseInt(current_cart_items[id]) + parseInt(quantity);
      localStorage.setItem('cartItems', JSON.stringify({...current_cart_items, ...{[id]:new_quantity}}))
    } else if (cart_items[id] === undefined) {
      console.log("adding", id, "not exist same key")
      localStorage.setItem('cartItems', JSON.stringify({...cart_items, ...{[id]:quantity}}))
    }
    navigate(`/cart/`)
  }
  //const product = products.find((product) => product._id == id);
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
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.stockCount > 0
                      ? "In stock"
                      : (product.stockCount < 5
                      ? "Limited"
                      : "Out of Stock")}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.stockCount > 0 && (
                <ListGroupItem>
                  <Col>Quantity</Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {Array.from(Array(product.stockCount+1).keys()).map(
                          (num) => {
                            return <option value={num}>{num}</option>;
                          }
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button
                  onClick = {addToCartHandler}
                    variant="primary"
                    size="lg"
                    disabled={product.stockCount === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </ThemeProvider>
    </>
  );
}

export default ProductScreen;

import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardHeader,
  Avatar,
  getStepButtonUtilityClass,
} from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { Fragment } from "react";
import Chip from "@mui/material/Chip";
import { Image, AspectRatio } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import ProductScreen from "../../screens/shop/ProductScreen";

function CartItemCard(props) {
  console.log("Child-rerender");
  const theme = createTheme();
  var item = props.item;
  var i = props.i;
  const is_checkout = props.is_checkout == true ? true : false;
  // console.log(item);
  
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(props.count);
  
  // console.log("quantity", quantity)
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${item}`);
      setProduct(data);
      if (is_checkout) {
      props.setTotal((prev) =>({...prev, [data._id]:quantity * data.price}));
      }
      console.log("product", data);
    }
    fetchProduct();
    console.log(product);
  }, []);

//   if (product && is_checkout) {
//     props.setTotal(props.total + quantity * product.price);
//     }
  return (
    <Fragment key={i}>
      <ThemeProvider theme={theme}>
        <Card sx={{ width: "100%", height: "100%" }} variant="outlined">
           
          <Row>
            <Col>
              <Image src={product.image}></Image>
            </Col>
            <Col>{product.name}</Col>
            <Col>${product.price}</Col>

            {!is_checkout && (
              <>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Select
                      value={quantity}
                      onChange={(e) => { 
                        var val = parseInt(e.target.value);
                        setQuantity(val);
                        props.updateQuantity(item, val);
                      }}
                    >
                      {Array.from(Array(100).keys()).map(
                        (num) => {
                          return (
                            <option value={num} key={num}>
                              {num}
                            </option>
                          );
                        }
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  {/* <FaTrashAlt size={'2em'} onClick = {props.removeItem(item)}></FaTrashAlt>  will call removeItem directly why*/}
                  <FaTrashAlt
                    size={"2em"}
                    onClick={() => {
                      props.removeItem(item);
                    }}
                  ></FaTrashAlt>
                </Col>
              </>
            )}
            {is_checkout &&
            <>
            <Col>
            {quantity}
            </Col>
            <Col>
            <strong>Total:</strong> ${product.price * quantity}
            </Col>
            </>
            }
          </Row>
        </Card>
      </ThemeProvider>{" "}
    </Fragment>
  );
}

export default CartItemCard;

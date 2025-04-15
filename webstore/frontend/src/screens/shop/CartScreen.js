import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import CartItemCard from "../../components/shop/CartItemCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
function CartScreen() {
  const navigate = useNavigate();
  console.log("Parent-rerender");
  var cart_items = JSON.parse(localStorage.getItem("cartItems"));
  const [items, setItems] = React.useState(cart_items);
  const [user, setUser] = useState(null);
  const { isLoggedIn } = useAuth();

  console.log("items", items);
  function updateQuantity(id, new_quantity) {
    console.log("update qty", id, new_quantity);
    items[id] = new_quantity;
    setItems((prevState) => ({ ...items }));
    localStorage.setItem("cartItems", JSON.stringify(items));
    console.log("update qty", items);
  }
  function removeItem(id_to_remove) {
    console.log("update ");
    delete items[id_to_remove];
    setItems((prevState) => ({ ...items }));
    localStorage.setItem("cartItems", JSON.stringify(items));
  }
  return (
    <>
      {items && Object.keys(items).length > 0 ? (
        <>
          {Object.entries(items).map(([item, count], i) => {
            console.log("key-value", item, count);
            return (
              <CartItemCard
                item={parseInt(item)}
                count={parseInt(count)}
                key={i}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              ></CartItemCard>
            );
          })}
          <br></br>
          <LinkContainer to="/shop/shipping/">
            <Button variant="primary" size="lg">
              Proceed to Checkout
            </Button>
          </LinkContainer>
        </>
      ) : (
        <>No item to display</>
      )}
    </>
  );
}

export default CartScreen;

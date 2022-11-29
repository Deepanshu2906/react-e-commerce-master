import { useEffect, useState } from "react";

import Header from "../../components/Shared/Header/Header";
import CartItem from "../../components/Cart/CartItem";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("product.json")
      .then((res) => res.json())
      .then((res) => {
        setCartItem(res);
        updateTotalPrice(res);
      });
  }, []);

  // Step 3: takes new quantity and update cart items. passing function as props to child
  function updatePrice(item, newQuantity) {
    let items = cartItems;
    let cartItemIndex = items.findIndex((i) => i.name === item.name);
    items[cartItemIndex].qty = newQuantity;
    setCartItem(items);
    updateTotalPrice(items);
  }
  // 1. Update Total Price = sum of price*quantity for each cart items.
  function updateTotalPrice(res) {
    let sum = 0;
    for (let i = 0; i < res.length; i++) {
      sum = sum + Number(res[i].price) * Number(res[i].qty);
    }
    setTotalPrice(sum);
  }

  // delete items
  function deleteItemFromCart(index) {
    let updatedItems = cartItems;
    updatedItems.splice(index, 1);
    setCartItem(updatedItems);
    updateTotalPrice(updatedItems);
  }

  return (
    <div className="cart-container">
      <Header />
      {/* 2. Print updated total price */}
      <h4 className="totalPrice">Total Price: {totalPrice}</h4>
      <div>
        {cartItems.map((item, index) => (
          <CartItem
            // 4. Pass function as props.
            updatePrice={updatePrice}
            deleteItem={deleteItemFromCart}
            key={index}
            item={item}
            id={index}
          />
        ))}
      </div>
    </div>
  );
}
export default Cart;

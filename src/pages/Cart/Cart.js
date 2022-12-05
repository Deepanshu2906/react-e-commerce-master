import { useEffect, useState } from "react";

import Header from "../../components/Shared/Header/Header";
import CartItem from "../../components/Cart/CartItem";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // .. adding the items to local storage then fetching
    let cart = localStorage.getItem("ourCart");
    let cartItems = JSON.parse(cart);
    if (cart) {
      setCartItem(cartItems);
      updateTotalPrice(cartItems);
    }
  }, []);

  // Step 3: takes new quantity and update cart items. passing function as props to child
  function updatePrice(item, newQuantity) {
    let items = cartItems;
    let cartItemIndex = items.findIndex((i) => i.title === item.title);
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
    setTotalPrice(Math.ceil(sum));
  }

  // delete items
  function deleteItem(index) {
    // pass by ref(as array is an object) ki vajah se refesh nahi ho raha
    //let updatedItems = [...cartItems];

    let items = cartItems;
    items.splice(index, 1); // passing new updated array
    setCartItem(items);

    // .........updating total price also ----
    updateTotalPrice(items);

    // deleting/updating from local storage also
    localStorage.setItem("ourCart", JSON.stringify(items));
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
            deleteItem={deleteItem}
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

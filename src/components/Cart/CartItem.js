import { useEffect, useState } from "react";
import "./CartItem.css";

function CartItem(prop) {
  let [quantity, setQuantity] = useState(1);
  let [totalPrice, setPrice] = useState(prop.item.price);

  // to update to price on each refresh
  useEffect(() => {
    console.log("effect");
    if (quantity > 0) {
      setPrice(prop.item.price);
    }
  }, [prop]);

  function handleQuantityChange(newQuantity) {
    // console.log(newQuantity);
    if (newQuantity > 0) {
      totalPrice = Number(prop.item.price) * newQuantity;

      setQuantity(newQuantity);
      setPrice(totalPrice);

      // console.log(totalPrice);
    } else {
      totalPrice = 0;
      setPrice(totalPrice);
      setQuantity(0);
    }
    // Step 5: Call parent's function with new quantity.
    // console.log(newQuantity);
    prop.updatePrice(prop.item, newQuantity);
  }

  function handleDelete(index) {
    prop.deleteItem(index);
  }

  return (
    <div className="cart-item">
      <div className="container-1">
        <div className="container">
          <img className="cart-img" src={prop.item.image}></img>
        </div>
        <div className="container">
          <h4>{prop.item.title}</h4>
        </div>
      </div>

      <div className="container-2">
        <button
          onClick={() => handleDelete(prop.index)}
          className="btn btn-danger"
        >
          Delete item
        </button>
        <div className="container">
          <h4>&#8377; {totalPrice}</h4>
        </div>

        <div className="quantity btn-group">
          <button
            className="btn btn-minus"
            onClick={() =>
              handleQuantityChange(quantity <= 1 ? 0 : quantity - 1)
            }
          >
            -
          </button>
          <button className="btn btn-primary">{quantity}</button>
          <button
            className="btn btn-plus"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

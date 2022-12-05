import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import { createContext, useState } from "react";
import { AppContext } from "./Context";

function App() {
  // 2. Initialize Store.  creating central store for cart item count
  const [cartItems, setCartItems] = useState([]);

  // 3. Dispatchers (like postman)
  const dispatcherEvents = (actionType, payload) => {
    switch (actionType) {
      case "ADD_ITEM": {
        // setCartItems(...cartItems, payload);
        // console.log(payload);
        let items = cartItems.slice();
        items.push(payload);
        setCartItems(items);
        break;
      }
      case "UPDATE_ITEM": {
        let items = cartItems.slice();
        let index = items.findIndex((p) => p.id === payload.id);
        items[index] = payload;
        setCartItems(items);
        break;
      }
      default: {
        console.log("INVALID...");
      }
    }
  };
  return (
    <AppContext.Provider value={{ cartItems, dispatcherEvents }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/*" element={<p> Page not found, 404</p>}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

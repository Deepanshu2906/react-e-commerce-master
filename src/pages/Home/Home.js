import { useEffect, useState } from "react";

import ProductCard from "../../components/Home/ProductCard/ProductCard";

import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";

function Home() {
  // Creating a state for products data.
  // whenever there is achange in products, it will force component refresh.

  const [products, setProducts] = useState([]);

  // const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      // calling json function.
      .then((res) => res.json())
      // listening for json function to return.
      .then((res) => {
        // console.log("fetching data");
        res.forEach((o) => {
          o.qty = 1;
          o.rating.rate = Math.ceil(Number(o.rating.rate));
        });
        // console.log(res);
        setProducts(res);
      });
    // notifyCartUpdate();
  }, []);

  // function notifyCartUpdate() {
  //   console.log("home notify");
  //   const items = localStorage.getItem("ourCart");
  //   if (items) {
  //     const cartItems = JSON.parse(items);
  //     setCartItemCount(cartItems.length);
  //   }

  return (
    <div>
      <Header />
      <div>
        <div className="row">
          {products.map((product, i) => (
            <div key={product.id} className="col-3">
              <ProductCard
                item={product}
                index={i}
                key={product.id}
                // notify={notifyCartUpdate}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

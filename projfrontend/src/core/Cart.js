import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import getProducts from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";

const Cart= ()=> {
  const [products, setProducts] = useState([]);
  const [reload,setReload] = useState(false);

  useEffect(()=>{
setProducts(loadCart())

  },[reload])

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product,index)=>(
           
           <Card
            key={index}
            product={product}
            removeFromCart={true}
            addToCart={false}
            setReload={setReload}
            reload={reload}
            />)
        )}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };
  //   console.log("API IS ",process.env.REACT_APP_BACKEND)
  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row">
        <div className="col-6">{loadAllProducts()}</div>
        {/* <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts()
          ) : (
            <h3>NO products in cart</h3>
          )}
        </div> */}
        {/* <div className="col-6">
          <Paymentb/>
          </div> */}
        <div className="col-6">
            <StripeCheckout
            products={products}
            setReload={setReload}
            />
            </div>
      </div>
    </Base>
  );
}
export default Cart

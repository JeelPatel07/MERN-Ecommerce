import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout"
import {createOrder} from './helper/orderHelper'
import { API } from "../backend";
const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const makePayment = (token)=>{
    const body ={
        token,
        products,

    }
    const headers ={
        "Content-Type":"application/json"
    }
    return fetch(`${API}/stripepayment`,{
        method:"POST",
        headers,
        body:JSON.stringify(body)
    }).then(response=>{
        console.log(response)
        const {status} = response
        console.log("STATUS",status)
        

    }).catch(err=>console.log(err))
  }
  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
        <StripeCheckoutButton
        stripeKey="pk_test_9e8sqfodpyub8Tvj7kpRIjH100IbMrFrjK"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy T-Shirts"
        shippingAddress
        address

        >
      <button className="btn btn-success">Pay with stripe</button></StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;

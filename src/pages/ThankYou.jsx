// src/pages/ThankYou.js
import React from "react";
import { Navbar, Footer } from "../components";
import { useLocation } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const { totalAmount, shippingAddress } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="container my-5 py-5 text-center">
        <h1 className="display-4">Thank You for Your Order!</h1>
        <p className="lead">Payment processed successfully.</p>
        <hr />
        <p><strong>Payment Amount:</strong> ${totalAmount || "N/A"}</p>
        <p><strong>Shipping Address:</strong> {shippingAddress || "N/A"}</p>
        <p className="mt-4">
          We appreciate your purchase. Your order will be processed soon. You will receive a confirmation email shortly.
        </p>
        <a href="/" className="btn btn-primary mt-3">
          Continue Shopping
        </a>
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;
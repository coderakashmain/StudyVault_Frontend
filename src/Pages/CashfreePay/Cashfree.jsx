import { useState } from 'react';
import React from 'react';
import './Cashfree.css';
import axios from 'axios';

const Cashfree = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/payment-response`;  // Ensure proper redirect path

      const response = await axios.post('/api/donate-us', {
        amount: 10,  // Payment amount in INR
        customerEmail: "ab79212235@gmail.com",
        customerPhone: "6144128744",
        redirect_url: redirectUrl
      });

      if (response.data && response.data.payment_link) {
        window.location.href = response.data.payment_link;  // Redirect to payment page
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error?.response?.data || error.message);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='cashfree'>
      <h2>StudyVault Payment</h2>
      <button onClick={handlePayment} disabled={loading} className='active'>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </section>
  );
};

export default Cashfree;

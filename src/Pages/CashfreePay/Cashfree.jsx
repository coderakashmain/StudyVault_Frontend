import { useState } from 'react';
import React from 'react';
import './Cashfree.css';
import axios from 'axios';
import {  useNavigate } from 'react-router';
import { load } from "@cashfreepayments/cashfree-js";
import studyvault from '../../photo/Study⁐Vault-logo-black.png'

const Cashfree = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');
  const [gmail, setgmail] = useState('');
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [oderid,setOrderid] = useState(null);
  const navigate = useNavigate();
 

  // Amount validation
  const isValidAmount = (amount) => !isNaN(amount) && Number(amount) > 0;

  const handlePayment = async () => {
    if (!amount || !isValidAmount(amount)) {
      setMessage('Please enter a valid amount.');
      return;
    }
    if (!mobilenumber || mobilenumber.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!gmail || !/\S+@\S+\.\S+/.test(gmail)) {
      setMessage('Please enter a valid email.');
      return;
    }

    setMessage('');
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/payment-donate-us/payment-response`;
      const response = await axios.post('/api/create-payment-order', {
        amount : Number(amount),
        customerEmail: gmail,
        customerPhone: mobilenumber,
        redirect_url: redirectUrl,
      });

      const sessionId = response.data.paymentSessionId;
      const orderidvalue = response.data.orderid;
      setOrderid(orderidvalue);
      setPaymentSessionId(sessionId);
      doPayment(sessionId);

    } catch (error) {
      setMessage("Something Error happend!")
      console.error('Error creating payment order:', error);
    } finally {
      setLoading(false);
    }
  };

  const doPayment = async (paymentSessionId) => {
    let cashfree;
    await load({
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
      // mode: "sandbox",
    }).then((instance) => {
      cashfree = instance;
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self",
        // redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.log("Payment error:", result.error);
          window.location.href = `${redirectUrl}?order_id=${oderid}&txStatus=FAILED`;

        } else if (result.paymentDetails) {
          window.location.href = `${redirectUrl}?order_id=${oderid}&txStatus=PAID`;
          console.log("Payment completed successfully:", result.paymentDetails.paymentMessage);
        }
      });
    });
  };

  const handleback = () => {
    navigate("/");
  };

  return (
    <section id='cashfree'>
      <div className="cashfree-left">
        <div className="decorate1"></div>
        <div className="decorate2"></div>
        <h1>Grow Our Own website for Our and Our future Juniors!</h1>

        <p>Your support make Us!</p>
        <ul>
          <li><strong>01</strong> &nbsp;&nbsp;Your support makes us stronger, helping us provide better study resources.</li>
          <li><strong>02</strong> &nbsp;&nbsp;With your help, we can expand our reach and assist more students in their academic journey.</li>
          <li><strong>03</strong> &nbsp;&nbsp;Every contribution drives our mission forward, keeping StudyVault free and accessible for all.</li>
        </ul>
       

      </div>
      <div className="cashfree-right">
        <div className="web-logo" >  
        <img src={studyvault} alt="" />
            </div>
        <div className="cashfree-right-box">
    
       
       <h1>Grow Our Own website for Our and Our future Juniors!</h1>
      <h2>Enter this information</h2>
      <div className="cashfree-payment-input">
      <input type="number" placeholder='Enter Amount ' name='amount' onChange={(e) => setAmount(e.target.value)} />
      <div className="inr-box">INR</div>

      </div>
      <input type="number" placeholder='Enter Mobile Number' name='number' onChange={(e) => setmobilenumber(e.target.value)} required />
      <input type="email" placeholder='Enter Gmail' name='gmail' onChange={(e) => setgmail(e.target.value)} required />
      {message && (<p>{message}</p>)}
      <button onClick={handlePayment} disabled={loading} className='active'>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <big>This donation will fuel our future goals, enabling us to enhance the website and expand our resources for students.</big>
     
      </div>
      <button onClick={handleback} className='active' style={{ position: 'absolute', color: 'black', top: '1.5%', left: '3%', background: '#FFFFFF', border: 'none', borderRadius: '0.2rem' }}>Back</button>
      
      </div>

    </section>
  );
};

export default Cashfree;

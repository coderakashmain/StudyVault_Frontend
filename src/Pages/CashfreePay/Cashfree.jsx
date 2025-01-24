import { useState } from 'react';
import React from 'react';
import './Cashfree.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Cashfree = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [message,setMessage] = useState('');
  const [mobilenumber,setmobilenumber] = useState('');
  const [gmail,setgmail] = useState('');

  const navigate = useNavigate();


  const handlePayment = async () => {
   
    if(amount){
      setMessage('');
    setLoading(true);
    const redirectUrl = `${window.location.origin}/payment-donate-us/payment-response`;  // Ensure proper redirect path

    try {
      
      const response = await axios.post('/api/donate-us', {
        amount: 10,  // Payment amount in INR
        customerEmail: gmail,
        customerPhone: mobilenumber,
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
  }else{
    setMessage("Enter a Amount");
   }
  };

  const handleback = ()=>{
    navigate(-1);
  }

  return (
    <section id='cashfree'>
      <h2>StudyVault Payment</h2>
      <input type="number" placeholder='Enter amount' name='amount' onChange={(e)=>setAmount(e.target.value)} />
      <input type="number" placeholder='Enter mobile number' name='number' onChange={(e)=>setmobilenumber(e.target.value)} required/>
      <input type="gmail" placeholder='Enter Gmail' name='gmail' onChange={(e)=>setgmail(e.target.value)} required />
      {message && (<p>{message}</p>)}
      <button onClick={handlePayment} disabled={loading} className='active'>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <button onClick={handleback} className='active' style={{position : 'absolute',color: '#71abc2', top : '3%', left : '3%', background : '#bfd7de8f',border : 'none', borderRadius : '0.2rem'}}>Back</button>
    </section>
  );
};

export default Cashfree;

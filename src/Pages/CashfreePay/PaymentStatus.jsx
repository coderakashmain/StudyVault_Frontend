import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./PaymentStatus.css"
import studyvault from '../../photo/Study⁐Vault-logo-black.png'

const PaymentStatus = () => {
    const query = new URLSearchParams(useLocation().search);
    const orderId = query.get("order_id"); 
    const [status, setStatus] = useState("null");
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (orderId) {
                try{
                    const response =  await axios.get(`/api/payment-status/${orderId}`)
                    
                    setStatus(response.data.status);
                    setLoading(false);
              
                }catch(error){
                    console.error("Error fetching payment status:", error);
                        setStatus('ERROR');
                        setLoading(false);
                }
              
            }
        }
        fetchPaymentStatus();
     
    }, [orderId]);

    if (loading) return <div id='paymentstatus' style={{ fontSize : '1.2rem', fontWeight : '500',textAlign: "center", position: "relative", zIndex: "100000000", top: "0%" }}>Checking payment status...</div>;

    return (
        <div  id="paymentstatus" style={{ textAlign: "center", position: "relative", zIndex: "100000000", top: "0%" }}>
            <img src={studyvault} alt="" />
            {status === "PAID" ? (
                <i className="fa-solid fa-circle-check"></i>
            ) : (
                <i className="fa-solid fa-circle-exclamation" style={{ color : 'red'}}></i>
            )}
          
            
            <h2>Payment {status === "PAID" ? "Successful" : "Failed"}!</h2>
            <p>Order ID: {orderId || "N/A"}</p>
            {status === "PAID" ? (
                <p>Thank you for your Support.</p>
            ) : (
                <p>Please try again.</p>
            )}
            <NavLink to="/payment-donate-us">back</NavLink>
        </div>
    );
};

export default PaymentStatus;

import React  from 'react';
import { useLocation } from 'react-router-dom';

const PaymentStatus = () => {
    const query = new URLSearchParams(useLocation().search);
    const status = query.get("txStatus");  // Get transaction status from URL
    const orderId = query.get("orderId");  // Get order ID

    return (
        <div style={{ textAlign: "center", marginTop: "50px" , position : 'relative', zIndex : '100000000', background : '#fff',top : '0%'}}>
            <h2>Payment {status === "SUCCESS" ? "Successful" : "Failed"}!</h2>
            <p>Order ID: {orderId}</p>
            {status === "SUCCESS" ? (
                <p>Thank you for your payment.</p>
            ) : (
                <p>Please try again.</p>
            )}
        </div>
    );
};

export default PaymentStatus;

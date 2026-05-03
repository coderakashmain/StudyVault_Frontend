import React, { useEffect, useState } from "react";
import './adminShared.css';
import { useAdminLogin } from "../../Context/AdminLoginCheck/AdminLoginCheck";
import useApi from "../../hooks/useApi";

const IconCreditCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const PaymentHistory = () => {
  const { adminToken } = useAdminLogin();
  const { get, loading } = useApi();
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPayments = async () => {
    const res = await get("/admin/payments", adminToken);
    if (res) setPayments(res);
  };

  useEffect(() => { fetchPayments(); }, []);

  const filtered = payments.filter(p => 
    String(p.order_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(p.customer_email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(p.customer_phone || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = payments.reduce((acc, curr) => acc + (curr.status === 'PAID' ? parseFloat(curr.amount) : 0), 0);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          <div>
            <h2><IconCreditCard /> Payment History</h2>
            <p>Track all donations and support transactions</p>
          </div>
          <div style={{ textAlign: 'right', background: '#f0fdf4', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #dcfce7' }}>
            <span style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>Total Revenue</span>
            <h3 style={{ margin: 0, color: '#15803d', fontSize: '1.4rem' }}>₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search by Order ID, Email or Phone..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            fontSize: '0.85rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            outline: 'none'
          }}
        />
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>ORDER ID</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>CUSTOMER</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>AMOUNT</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 500, color: '#0f172a' }}>{item.order_id}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#0f172a' }}>{item.customer_email}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.customer_phone}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>₹{item.amount}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    padding: '4px 8px', 
                    borderRadius: '6px',
                    backgroundColor: item.status === 'PAID' ? '#dcfce7' : '#fee2e2',
                    color: item.status === 'PAID' ? '#15803d' : '#ef4444',
                    textTransform: 'uppercase'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            No payment history found
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;

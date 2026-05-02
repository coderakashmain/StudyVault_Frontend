import React, { useContext, useEffect, useState } from 'react'
import './Admine.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useApi from '../../hooks/useApi';
import { AdminLoginContext } from '../../Context/AdminLoginCheck/AdminLoginCheck';
import { AlartContectValue } from '../../Context/AlartContext/AlartContext';

/* ── inline SVG icons (no bg colour) ── */
const IconGauge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IconNewspaper = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
  </svg>
);
const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconMonitor = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
  </svg>
);
const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconLogOut = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Admine = (props) => {
  const navigate = useNavigate();
  const { check, setCheck } = useContext(AdminLoginContext);
  const [loading, setLoading] = useState(true);
  const { showAlart } = useContext(AlartContectValue);
  const { get, post } = useApi();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await get(`/adminPage`, false);
        if (response) {
          setCheck(true);
          setLoading(false);
        }
      } catch (error) {
        setCheck(false);
        navigate('/Admin/AdminLogIn');
      }
    };
    checkAuthorization();
  }, []);

  const handleLogout = async () => {
    try {
      await post(`/Admin/logout`, false);
      window.location.href = "/Admin/AdminLogIn";
      sessionStorage.clear('isAdminLogin');
      showAlart('Logged out successfully', '', 'check');
      setCheck(false);
    } catch (error) {
      console.error(error);
      showAlart(`Logout failed`, error.message || "", 'cancel');
    }
  };

  if (!check) {
    return (
      <div style={{
        background: '#0a0f1e', position: 'fixed', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', zIndex: 10000, gap: '1rem'
      }}>
        <IconShield style={{ width: 48, height: 48, color: 'rgba(239,68,68,0.6)' }} />
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
          Unauthorized access. Redirecting…
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        background: '#0a0f1e', position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
          Verifying session…
        </p>
      </div>
    );
  }

  return (
    <section id="admin">
      {/* ── Top Nav ── */}
      <div className="admin-nav">
        <div className="admin-nav-brand">
          <IconShield style={{ width: 16, height: 16, color: '#009bb7' }} />
          <h2>StudyVault&nbsp;<span style={{ opacity: 0.4, fontWeight: 400 }}>/ Admin</span></h2>
        </div>

        <div className="admin-nav-right">
          <div className="admin-nav-user" onClick={() => navigate('/')}>
            <IconHome style={{ width: 14, height: 14 }} />
            <span>Home</span>
          </div>
          <div className="admin-nav-user">
            <IconUser style={{ width: 14, height: 14 }} />
            <span>Admin</span>
          </div>
          <div className="admin-logout-btn" onClick={handleLogout}>
            <IconLogOut style={{ width: 14, height: 14 }} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="admin-box">
        {/* Sidebar */}
        <div className="admin-left-box">
          <span className="sidebar-section-label">Overview</span>
          <NavLink to="" end>
            <h2><IconGauge /> Dashboard</h2>
          </NavLink>

          <span className="sidebar-section-label">Content</span>
          <NavLink to="Question">
            <h2><IconNewspaper /> Questions</h2>
          </NavLink>
          <NavLink to="syllabusupload">
            <h2><IconBook /> Syllabus</h2>
          </NavLink>
          <NavLink to="Notes">
            <h2><IconBook /> Notes</h2>
          </NavLink>
          <NavLink to="CsUpload">
            <h2><IconMonitor /> CS Upload</h2>
          </NavLink>

          <span className="sidebar-section-label">Users</span>
          <NavLink to="user-uploads">
            <h2><IconUpload /> User Uploads</h2>
          </NavLink>
          <NavLink to="Usersend">
            <h2><IconFolder /> User Send</h2>
          </NavLink>

          <div className="sidebar-divider" />

          <div className="sidebar-danger">
            <NavLink to="LogOut">
              <h2><IconLogOut /> Log Out</h2>
            </NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-right-box">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Admine;

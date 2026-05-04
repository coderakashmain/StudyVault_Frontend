import React, { useContext, useEffect, useState } from 'react'
import './Admine.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useApi from '../../hooks/useApi';
import { AdminLoginContext } from '../../Context/AdminLoginCheck/AdminLoginCheck';
import { AlartContectValue } from '../../Context/AlartContext/AlartContext';

/* ── inline SVG icons ── */
const IconGauge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IconSmartphone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/>
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
const IconMessage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconCreditCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);
const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Admine = (props) => {
  const navigate = useNavigate();
  const { check, setCheck } = useContext(AdminLoginContext);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        navigate('/admin/login');
      }
    };
    checkAuthorization();
  }, []);

  const handleLogout = async () => {
    try {
      await post(`/admin/logout`, false);
      window.location.href = "/admin/login";
      sessionStorage.clear('isAdminLogin');
      showAlart('Logged out successfully', '', 'check');
      setCheck(false);
    } catch (error) {
      console.error(error);
      showAlart(`Logout failed`, error.message || "", 'cancel');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 880) {
      setIsSidebarOpen(false);
    }
  };

  if (!check) {
    return (
      <div className="admin-unauthorized">
        <IconShield style={{ width: 48, height: 48, color: 'rgba(239,68,68,0.6)' }} />
        <p>Unauthorized access. Redirecting…</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Verifying session…</p>
      </div>
    );
  }

  return (
    <section id="admin">
      {/* ── Top Nav ── */}
      <div className="admin-nav">
        <div className="admin-nav-left">
          <button className="hambar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <IconX /> : <IconMenu />}
          </button>
          <div className="admin-nav-brand">
            <IconShield style={{ width: 16, height: 16, color: '#009bb7' }} />
            <h2>StudyVault&nbsp;<span style={{ opacity: 0.4, fontWeight: 400 }}>/ Admin</span></h2>
          </div>
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
        <div className={`admin-left-box ${isSidebarOpen ? 'open' : 'closed'}`}>
          <span className="sidebar-section-label">Overview</span>
          <NavLink to="" end onClick={closeSidebarOnMobile}>
            <h2><IconGauge /> Dashboard</h2>
          </NavLink>

          <span className="sidebar-section-label">Content</span>
          <NavLink to="Question" onClick={closeSidebarOnMobile}>
            <h2><IconNewspaper /> Questions</h2>
          </NavLink>
          <NavLink to="syllabusupload" onClick={closeSidebarOnMobile}>
            <h2><IconBook /> Syllabus</h2>
          </NavLink>
          <NavLink to="Notes" onClick={closeSidebarOnMobile}>
            <h2><IconBook /> Notes</h2>
          </NavLink>
          <NavLink to="CsUpload" onClick={closeSidebarOnMobile}>
            <h2><IconMonitor /> CS Upload</h2>
          </NavLink>

          <span className="sidebar-section-label">Users</span>
          <NavLink to="user-uploads" onClick={closeSidebarOnMobile}>
            <h2><IconUpload /> User Uploads</h2>
          </NavLink>
          <NavLink to="Usersend" onClick={closeSidebarOnMobile}>
            <h2><IconFolder /> User Send</h2>
          </NavLink>

          <span className="sidebar-section-label">Management</span>
          <NavLink to="feedbacks" onClick={closeSidebarOnMobile}>
            <h2><IconMessage /> Feedback</h2>
          </NavLink>
          <NavLink to="payments" onClick={closeSidebarOnMobile}>
            <h2><IconCreditCard /> Payments</h2>
          </NavLink>
          <NavLink to="deletion-requests" onClick={closeSidebarOnMobile}>
            <h2><IconTrash /> Deletions</h2>
          </NavLink>
          <NavLink to="apk-upload" onClick={closeSidebarOnMobile}>
            <h2><IconSmartphone /> APK Update</h2>
          </NavLink>


          <div className="sidebar-divider" />

          <div className="sidebar-danger">
            <NavLink to="LogOut" onClick={handleLogout}>
              <h2><IconLogOut /> Log Out</h2>
            </NavLink>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

        {/* Main Content */}
        <div className="admin-right-box">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Admine;

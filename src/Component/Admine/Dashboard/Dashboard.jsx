import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import { FetchDataContext } from '../../../Context/FretchDataContext/FetchData'
import { useNavigate } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';

/* ── SVG Icons ── */
const IconGauge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IconNewspaper = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
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
const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Dashboard = () => {
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const { paperList, setPaperList } = useContext(FetchDataContext);
  const { showAlart } = useContext(AlartContectValue);
  const { get } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/admin/fetchData', false);
        if (response) {
          const data = Array.isArray(response) ? response : response.data || [];
          setPaperList(data);
          setTotalCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showAlart("Error fetching Data", "", "mark");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (paperList && Array.isArray(paperList)) {
      setTotalCount(paperList.length);
    }
  }, [paperList]);

  const stats = [
    {
      icon: <IconNewspaper />,
      value: totalCount,
      label: 'Question Papers',
      action: () => navigate('Question'),
      accent: 'accent-teal',
    },
    {
      icon: <IconBook />,
      value: 45,
      label: 'Syllabus Uploads',
      action: () => navigate('syllabusupload'),
      accent: 'accent-purple',
    },
    {
      icon: <IconBook />,
      value: 45,
      label: 'Note Uploads',
      action: () => navigate('Notes'),
      accent: 'accent-emerald',
    },
    {
      icon: <IconFolder />,
      value: 45,
      label: 'User Submissions',
      action: () => navigate('Usersend'),
      accent: 'accent-blue',
    },
    {
      icon: <IconMonitor />,
      value: 45,
      label: 'CS Uploads',
      action: () => navigate('CsUpload'),
      accent: 'accent-amber',
    },
  ];

  return (
    <aside id="dashboard">
      {/* Header */}
      <div className="dash-header">
        <h1>
          <IconGauge />
          Control Panel
        </h1>
        <p>Overview of all platform content and submissions</p>
      </div>

      {/* Stats */}
      <div className="dashboard-box">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className={`stat-card-icon ${stat.accent}`}>
              {stat.icon}
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-footer" onClick={stat.action}>
              View all <IconArrow />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <p className="dash-section-title">Quick Actions</p>
      <div className="quick-actions">
        <button className="quick-action-btn" onClick={() => navigate('Question')}>
          <IconPlus /> Add Question
        </button>
        <button className="quick-action-btn" onClick={() => navigate('syllabusupload')}>
          <IconUpload /> Upload Syllabus
        </button>
        <button className="quick-action-btn" onClick={() => navigate('Notes')}>
          <IconUpload /> Upload Note
        </button>
        <button className="quick-action-btn" onClick={() => navigate('user-uploads')}>
          <IconFolder /> Review Uploads
        </button>
      </div>
    </aside>
  );
};

export default Dashboard;

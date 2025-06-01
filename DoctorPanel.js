import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorPanel = () => {
  const navigate = useNavigate();
  const doctorName = "Doctor"; // Replace with dynamic name if needed

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    cancelled: 0,
    completed: 0,
    rescheduled: 0
  });

  const [todaysAppointments, setTodaysAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/appointments/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats:", err));

    axios.get('http://localhost:5000/api/admin/appointments/today')
      .then(res => setTodaysAppointments(res.data))
      .catch(err => console.error("Error fetching today's appointments:", err));
  }, []);

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to right, #f4f3ff,rgb(229, 217, 240))',
      minHeight: '150vh',
      color: '#333'
    }}>
      
      {/* Navbar */}
      <div style={{
        backgroundColor: '#6a0dad',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(8, 8, 8, 0.2)'
      }}>
        <div style={{ display: 'flex', gap: '2rem', fontWeight: 'bold' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/doctor/home')}>Home</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/doctor/appointments')}>Appointments</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/doctor/patients')}>Patient Details</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#fff',
            color: '#6a0dad',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
        >
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div style={{ padding: '2rem' }}>
        <h1 style={{ color: '#6a0dad', fontSize: '2.5rem', textAlign: 'center' }}>WELCOME, Dr. {doctorName}</h1>
        <p style={{ color: '#555', fontSize: '1.1rem',textAlign: 'center', maxWidth: '600px', margin: '1rem auto' }}>
          Manage your appointments and patients efficiently from your dashboard.
        </p>
      </div>

      {/* Navigation Cards */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        padding: '1rem 2rem',
        flexWrap: 'wrap'
      }}>
        {[
          { title: "Manage Appointments", desc: "Approve, reschedule or cancel patient appointments.", path: "/doctor/appointments" },
          { title: "Patient Details", desc: "View patient records, prescriptions, and more.", path: "/doctor/patients" }
        ].map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              width: '260px',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ color: '#6a0dad', marginBottom: '0.5rem' }}>{card.title}</h3>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Appointment Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        padding: '2rem'
      }}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={{
            background: '#fff',
            padding: '1.2rem 1.5rem',
            minWidth: '140px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: 0, color: '#6a0dad', textTransform: 'uppercase', fontSize: '0.9rem' }}>{key}</h4>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#6a0dad' }}>Today's Appointments</h2>
        {todaysAppointments.length === 0 ? (
          <p style={{ color: '#777' }}>No appointments scheduled for today.</p>
        ) : (
          todaysAppointments.map((a, index) => (
            <div key={index} style={{
              background: '#fff',
              padding: '1rem 1.2rem',
              marginBottom: '1rem',
              borderLeft: '5px solid #6a0dad',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}>
              <strong style={{ color: '#333', fontSize: '1.1rem' }}>{a.patientName || 'Patient'}</strong><br />
              <small style={{ color: '#666' }}>{formatDate(a.date)} | {a.time}</small><br />
              <span style={{ color: '#444' }}>Status: <strong>{a.status}</strong></span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorPanel;

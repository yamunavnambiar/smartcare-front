import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/appointments/${id}/approve`);
      fetchAppointments();
    } catch (err) {
      console.error('Error approving appointment:', err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  };

  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };
  
  const closePatientModal = () => {
    setSelectedPatient(null);
    setShowModal(false);
  };
  

  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = filter === 'all' ? true : app.status === filter;
    const matchesSearch = (
      app.patientName?.toLowerCase().includes(searchTerm) ||
      app.doctorId?.name?.toLowerCase().includes(searchTerm)
    );
    return matchesStatus && matchesSearch;
  });
  
  

  

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: '#4B0082' }}>Appointment Management</h2>

      <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
        }}
     >
        <div style={{ flex: 1, minWidth: '250px' }}>
            <input
            type="text"
            placeholder="Search by patient or doctor name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '25px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontSize: '1rem'
            }}
            />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['all', 'pending', 'approved', 'cancelled', 'rescheduled'].map(status => (
            <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: filter === status ? '#6a0dad' : '#eee',
                color: filter === status ? '#fff' : '#333',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
                }}
            >
                {status.toUpperCase()}
            </button>
            ))}
        </div>
        </div>


      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>Patient</th>
            <th style={thStyle}>Doctor</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map(app => (
            <tr key={app._id}>
              <td
                style={{ ...tdStyle, color: '#6a0dad', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => openPatientModal(app)}
             >
                {app.patientName}
            </td>

              <td style={tdStyle}>{app.doctorId?.name}</td>
              <td style={tdStyle}>{app.date || '-'}</td>
              <td style={tdStyle}>{app.time || '-'}</td>
              <td style={tdStyle}>
                <span style={getStatusStyle(app.status)}>{app.status.toUpperCase()}</span>
              </td>
              <td style={tdStyle}>
                {app.status === 'pending' && (
                  <button onClick={() => handleApprove(app._id)} style={actionBtnStyle('#28a745')}>
                    Approve
                  </button>
                )}
                {(app.status === 'pending' || app.status === 'approved') && (
                  <button onClick={() => handleCancel(app._id)} style={actionBtnStyle('#dc3545')}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showModal && selectedPatient && (
        <div style={modalOverlay}>
            <div style={modalContentAnimated}>
            <button onClick={closePatientModal} style={closeIconStyle}>×</button>
            <h2 style={{ color: '#6a0dad', marginBottom: '1rem' }}>Patient Details</h2>
            <div style={{ lineHeight: '1.6' }}>
                <p><strong>Name:</strong> {selectedPatient.patientName}</p>
                <p><strong>Age:</strong> {selectedPatient.age}</p>
                <p><strong>Email:</strong> {selectedPatient.email}</p>
                <p><strong>Contact:</strong> {selectedPatient.contactNumber}</p>
                <p><strong>Symptoms:</strong> {selectedPatient.symptoms || 'N/A'}</p>
            </div>
            <button onClick={closePatientModal} style={closeBtnStyle}>Close</button>
            </div>
        </div>
      )}
      
      
    </div>
  );
};

// Reusable inline style blocks
const thStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

const actionBtnStyle = (bgColor) => ({
  marginRight: '0.5rem',
  padding: '5px 10px',
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
});

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '0.85rem',
    };
  
    switch (status) {
      case 'approved':
        return { ...baseStyle, backgroundColor: '#28a745' }; // Green
      case 'pending':
        return { ...baseStyle, backgroundColor: '#ffc107', color: '#000' }; // Yellow
      case 'cancelled':
        return { ...baseStyle, backgroundColor: '#dc3545' }; // Red
      case 'rescheduled':
        return { ...baseStyle, backgroundColor: '#007bff' }; // Blue
      
      default:
        return { ...baseStyle, backgroundColor: '#6a0dad' }; // Purple fallback
    }
  };
  
  const modalOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out',
    padding: '1rem',
  };
  
  const modalContentAnimated = {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    animation: 'slideFadeIn 0.3s ease',
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#333',
    cursor: 'pointer',
  };
  
  const closeBtnStyle = {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#6a0dad',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  
    
export default AppointmentsManagement;

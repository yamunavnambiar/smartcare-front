import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUserData(data.user);
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h2 style={styles.heading}>WELCOME, {userData.fullName}</h2>
        <p style={styles.subtext}>Email: {userData.email}</p>
      </div>

      <h3 style={styles.sectionTitle}>📅 Your Appointments</h3>
      {appointments.length === 0 ? (
        <p style={styles.noAppointments}>No appointments found.</p>
      ) : (
        appointments.map((appt, index) => (
          <div key={index} style={styles.appointmentCard}>
            <div style={styles.headerBox}>
              <h4 style={styles.appointmentTitle}>
                {appt.doctorId?.name || 'Dr. Unknown'} &middot;{" "}
                <span style={styles.specialization}>{appt.doctorId?.specialization || 'N/A'}</span>
              </h4>
              <span style={{ ...styles.statusBadge, backgroundColor: getStatusColor(appt.status) }}>
                {appt.status}
              </span>
            </div>

            <p><strong>👤 Patient:</strong> {appt.patientName}, {appt.age} yrs</p>
            <p><strong>📞 Contact:</strong> {appt.contactNumber}</p>
            <p><strong>📆 Date:</strong> {appt.date || 'Not yet scheduled'}</p>
            <p><strong>⏰ Time:</strong> {appt.time || 'Not yet scheduled'}</p>

            {appt.prescriptions.length > 0 && (
              <>
                <h4 style={styles.subsection}>💊 Prescriptions</h4>
                <ul style={styles.list}>
                  {appt.prescriptions.map((p, i) => (
                    <li key={i}><strong>{p.date}:</strong> {p.medication} – {p.instructions}</li>
                  ))}
                </ul>
              </>
            )}

            {appt.labRecords.length > 0 && (
              <>
                <h4 style={styles.subsection}>🧪 Lab Records</h4>
                <ul style={styles.list}>
                  {appt.labRecords.map((r, i) => (
                    <li key={i}><strong>{r.date}:</strong> {r.testName} – {r.result} ({r.remarks || 'No remarks'})</li>
                  ))}
                </ul>
              </>
            )}

            {appt.doctorNotes.length > 0 && (
              <>
                <h4 style={styles.subsection}>📝 Doctor Notes</h4>
                <ul style={styles.list}>
                  {appt.doctorNotes.map((n, i) => (
                    <li key={i}><strong>{n.date}:</strong> {n.note}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

// Helper function to color-code status
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return '#a0e7a0';
    case 'cancelled':
      return '#f7a8a8';
    case 'pending':
      return '#ffeaa7';
    default:
      return '#d1a8e8';
  }
};

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(to right, #f7f3fc, #ffffff)",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "30px",
    color: "#6a4c93",
    marginBottom: "8px",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtext: {
    fontSize: "16px",
    color: "#555",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "22px",
    marginTop: "40px",
    marginBottom: "15px",
    color: "#6a4c93",
  },
  appointmentCard: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  appointmentTitle: {
    fontSize: "18px",
    color: "#4b0082",
  },
  specialization: {
    fontSize: "14px",
    color: "#9d71bc",
  },
  statusBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#2d2d2d",
  },
  subsection: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#6a4c93",
  },
  list: {
    textAlign: "left",
    paddingLeft: "20px",
    color: "#444",
  },
  noAppointments: {
    fontSize: "16px",
    color: "#777",
  },
  loading: {
    fontSize: "18px",
    color: "#9d71bc",
    textAlign: "center",
    padding: "40px",
  },
};

export default ProfilePage;

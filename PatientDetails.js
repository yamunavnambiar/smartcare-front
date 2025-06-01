import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [, setAppointments] = useState([]);
  const [prescriptionInputs, setPrescriptionInputs] = useState({});
  const [labRecordInputs, setLabRecordInputs] = useState({});
  const [noteInputs, setNoteInputs] = useState({});

  useEffect(() => {
    fetchUniquePatients();
  }, []);

  const fetchUniquePatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/unique-patients');
      const filteredPatients = response.data.filter(p => p && p.email);
      setPatients(filteredPatients);
    } catch (err) {
      setError('Failed to fetch patients.');
    }
  };

  const handleSelectPatient = async (email) => {
    setSelectedEmail(email);
    setSelectedPatientData(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/patient/${encodeURIComponent(email)}`);
      if (response.data && response.data.appointments) {
        setSelectedPatientData(response.data);
      } else {
        setSelectedPatientData(null);
      }
    } catch (err) {
      setSelectedPatientData([]);
    }
  };

  const fetchAppointmentsOrSelectedPatient = async () => {
    if (selectedEmail) {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/patient/${encodeURIComponent(selectedEmail)}`);
        setSelectedPatientData(response.data);
      } catch (err) {
        console.error('Failed to refresh patient data', err);
      }
    }
  };

  const handleAddPrescription = async (appointmentId) => {
    const input = prescriptionInputs[appointmentId];
    if (!input || !input.medication?.trim() || !input.instructions?.trim()) {
      alert('Please fill in both medication and instructions.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/admin/appointments/${appointmentId}/add-prescription`, {
        date: new Date().toLocaleDateString(),
        medication: input.medication.trim(),
        instructions: input.instructions.trim(),
      });

      setAppointments((prev) =>
        prev.map((appt) => (appt._id === appointmentId ? res.data : appt))
      );

      setPrescriptionInputs((prev) => ({
        ...prev,
        [appointmentId]: { medication: '', instructions: '' },
      }));

      await fetchAppointmentsOrSelectedPatient();
    } catch (err) {
      alert('Error adding prescription');
    }
  };

  const handleAddLabRecord = async (appointmentId) => {
    const input = labRecordInputs[appointmentId];
    if (!input || !input.testName?.trim() || !input.result?.trim()) {
      alert('Please fill in test name and result.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/admin/appointments/${appointmentId}/add-lab-record`, {
        date: new Date().toLocaleDateString(),
        testName: input.testName.trim(),
        result: input.result.trim(),
        remarks: input.remarks?.trim() || '',
      });

      setAppointments((prev) =>
        prev.map((appt) => (appt._id === appointmentId ? res.data : appt))
      );

      setLabRecordInputs((prev) => ({
        ...prev,
        [appointmentId]: { testName: '', result: '', remarks: '' },
      }));

      await fetchAppointmentsOrSelectedPatient();
    } catch (err) {
      alert('Error adding lab record');
    }
  };

  const handleAddDoctorNote = async (appointmentId) => {
    const input = noteInputs[appointmentId];
    if (!input || !input.note?.trim()) {
      alert('Please enter a note.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/admin/appointments/${appointmentId}/add-doctor-note`, {
        date: new Date().toLocaleDateString(),
        note: input.note.trim(),
      });

      setAppointments((prev) =>
        prev.map((appt) => (appt._id === appointmentId ? res.data : appt))
      );

      setNoteInputs((prev) => ({
        ...prev,
        [appointmentId]: { note: '' },
      }));

      await fetchAppointmentsOrSelectedPatient();
    } catch (err) {
      alert('Error adding doctor note');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f0fa', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: '#5e4b8b' }}>Patient Details</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left Panel */}
        <div style={{
          flex: 1,
          backgroundColor: '#e9dffb',
          border: '2px solid #c2a5f0',
          borderRadius: '12px',
          padding: '20px',
          maxHeight: '500px',
          overflowY: 'auto',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#6b42b2' }}>Patients</h3>
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {patients.map((patient, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectPatient(patient.email)}
                  style={{
                    padding: '12px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    backgroundColor: selectedEmail === patient.email ? '#d5c6f0' : '#ffffff',
                    border: '1px solid #b9a3d0',
                    transition: 'background-color 0.3s',
                  }}
                >
                  <strong>{patient.name}</strong><br />
                  <small style={{ color: '#555' }}>{patient.email}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Panel */}
        <div style={{
          flex: 2,
          backgroundColor: '#fff',
          border: '2px solid #d6c3f0',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          {!selectedEmail ? (
            <p>Select a patient to view details.</p>
          ) : selectedPatientData === null ? (
            <p>Loading patient details...</p>
          ) : selectedPatientData.appointments?.length > 0 ? (
            <div>
              <h3 style={{ color: '#5e4b8b' }}>{selectedPatientData.patientInfo?.name || "Name not available"}</h3>
              <p><strong>Email:</strong> {selectedPatientData.patientInfo?.email}</p>
              <p><strong>Age:</strong> {selectedPatientData.patientInfo?.age}</p>
              <p><strong>Contact:</strong> {selectedPatientData.patientInfo?.contactNumber}</p>

              <h4 style={{ marginTop: '20px' }}>Appointment History</h4>
              <ul>
                {selectedPatientData.appointments.map((appt, idx) => (
                  <li key={idx} style={{
                    marginBottom: '20px',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '20px'
                  }}>
                    <p><strong>Date & Time:</strong> {appt.date} at {appt.time}</p>
                    {appt.doctorId && (
                      <p><strong>Doctor:</strong> {appt.doctorId.name} ({appt.doctorId.specialization})</p>
                    )}
                    <p><strong>Status:</strong> {appt.status}</p>

                    {/* Prescriptions */}
                    <div style={{ marginTop: '10px' }}>
                      <h4 style={{ color: '#7c5dc3' }}>Prescriptions</h4>
                      <input type="text" placeholder="Medication"
                        value={prescriptionInputs[appt._id]?.medication || ''}
                        onChange={(e) => setPrescriptionInputs((prev) => ({
                          ...prev, [appt._id]: { ...prev[appt._id], medication: e.target.value }
                        }))}
                        style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <textarea placeholder="Instructions" rows={2}
                        value={prescriptionInputs[appt._id]?.instructions || ''}
                        onChange={(e) => setPrescriptionInputs((prev) => ({
                          ...prev, [appt._id]: { ...prev[appt._id], instructions: e.target.value }
                        }))}
                        style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <button onClick={() => handleAddPrescription(appt._id)} style={{ backgroundColor: '#a38cd9', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>
                        Add Prescription
                      </button>
                      <ul>{appt.prescriptions?.map((p, i) => (
                        <li key={i}><strong>{p.date}</strong>: {p.medication} - {p.instructions}</li>
                      ))}</ul>
                    </div>

                    {/* Lab Records */}
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ color: '#7c5dc3' }}>Lab Records</h4>
                      <input type="text" placeholder="Test Name"
                        value={labRecordInputs[appt._id]?.testName || ''}
                        onChange={(e) => setLabRecordInputs((prev) => ({
                          ...prev, [appt._id]: { ...prev[appt._id], testName: e.target.value }
                        }))}
                        style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <input type="text" placeholder="Result"
                        value={labRecordInputs[appt._id]?.result || ''}
                        onChange={(e) => setLabRecordInputs((prev) => ({
                          ...prev, [appt._id]: { ...prev[appt._id], result: e.target.value }
                        }))}
                        style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <textarea placeholder="Remarks (optional)" rows={2}
                        value={labRecordInputs[appt._id]?.remarks || ''}
                        onChange={(e) => setLabRecordInputs((prev) => ({
                          ...prev, [appt._id]: { ...prev[appt._id], remarks: e.target.value }
                        }))}
                        style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <button onClick={() => handleAddLabRecord(appt._id)} style={{ backgroundColor: '#a38cd9', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>
                        Add Lab Record
                      </button>
                      <ul>{appt.labRecords?.map((lr, i) => (
                        <li key={i}><strong>{lr.date}</strong>: {lr.testName} - {lr.result} {lr.remarks && `(${lr.remarks})`}</li>
                      ))}</ul>
                    </div>

                    {/* Doctor Notes */}
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ color: '#7c5dc3' }}>Doctor Notes</h4>
                      <textarea placeholder="Add doctor note" rows={3}
                        value={noteInputs[appt._id]?.note || ''}
                        onChange={(e) => setNoteInputs((prev) => ({
                          ...prev, [appt._id]: { note: e.target.value }
                        }))}
                        style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <button onClick={() => handleAddDoctorNote(appt._id)} style={{ backgroundColor: '#a38cd9', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>
                        Add Note
                      </button>
                      <ul>{appt.doctorNotes?.map((dn, i) => (
                        <li key={i}><strong>{dn.date}</strong>: {dn.note}</li>
                      ))}</ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No appointments or records found for this patient.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

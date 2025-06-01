import React, { useState, useEffect } from "react";
import axios from "axios";

const BookAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentConfirmed(false);
    setShowModal(true); // Show modal when booking an appointment
  };

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure you store token on login

      const res = await axios.post(
        "http://localhost:5000/api/user/book",
        {
          doctorId: selectedDoctor._id,
          patientName,
          age,
          contactNumber,
          email,
          symptoms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setAppointmentConfirmed(true);
        setShowModal(false); // Close modal after booking
        setPatientName("");
        setAge("");
        setContactNumber("");
        setEmail("");
        setSymptoms(""); 
        setTimeout(() => {
          setAppointmentConfirmed(false);
        }, 5000); // Reset confirmation message after 5 seconds
      }
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#5D3FD3",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  <style>
  {`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `}
  </style>


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#5D3FD3", fontWeight: "bold", fontSize: "30px" }}>BOOK AN APPOINTMENT</h2>

      <input
        type="text"
        placeholder="Search by name or specialization"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "20px auto",
          display: "block",
          padding: "10px 15px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        
        {doctors
          .filter((doctor) =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
          )
        
          .map((doctor) => (
          <div
            key={doctor._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              width: "250px",
              textAlign: "center",
              backgroundColor: "#F3E5F5",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "4px 4px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{
              color: "#5D3FD3",
              fontSize: "20px",
              marginBottom: "8px",
              fontWeight: "bold",
            }}>
              {doctor.name}</h3>
            {/* Doctor Photo */}
            {doctor.photo && (
              <img
                src={doctor.photo}
                alt={doctor.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
            )}
            <p style={{fontWeight: "bold", color: "#444" , margin: "5px 0"}}>
              <strong>Specialty:</strong> {doctor.specialization}</p>
            <p style={{fontWeight: "bold", color: "#555" , margin: "5px 0"}}>
              <strong>Availability:</strong> {doctor.availability}</p>

            {/* Description */}
            {doctor.description && (
              <p style={{ fontSize: "14px", marginTop: "10px", color: "#333" }}>
                {doctor.description}
              </p>
            )}

            <button
              onClick={() => handleBookAppointment(doctor)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#5D3FD3",
                color: "white",
                cursor: "pointer",
              }}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {appointmentConfirmed && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
          padding: "15px",
          borderRadius: "5px",
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold"
        }}>
          You have successfully booked an appointment. We will notify you once it gets confirmed.
        </div>
      )}

{showModal && selectedDoctor && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease-in-out",
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        animation: "slideIn 0.3s ease-in-out",
        position: "relative",
      }}
    >
      {/* Close Icon */}
      <div
        onClick={() => setShowModal(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#999",
        }}
      >
        &times;
      </div>
            <h3 style={{ color: "#5D3FD3" }}>Book with Dr. {selectedDoctor.name}</h3>

            <input
              type="text"
              placeholder="Your Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <textarea
              placeholder="Symptoms or Reason for Visit"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: "none" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={handleConfirmBooking}
                style={buttonStyle}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#333" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      

      
    </div>
  );
};

export default BookAppointments;

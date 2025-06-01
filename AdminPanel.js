import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const AdminPanel = () => {
const navigate = useNavigate();
const [searchQuery, setSearchQuery] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);  // to store clicked doctor
  const [showModal, setShowModal] = useState(false);           // to show/hide modal

  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availability, setAvailability] = useState("");
  const [editDoctorId, setEditDoctorId] = useState(null);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");

// This opens the modal with doctor details
const openDoctorModal = (doctor) => {
  setSelectedDoctor(doctor); // set the doctor to display
  setShowModal(true);        // show the modal
};

// This closes the modal and clears selected doctor
const closeModal = () => {
  setSelectedDoctor(null);   // clear doctor
  setShowModal(false);       // hide modal
};
  

 //get
useEffect(() => {
  fetchDoctors();
}, []);

const fetchDoctors = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/admin/doctors");
    setDoctors(response.data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
};

 //Handle photo upload
  const handlePhotoUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setPhoto(reader.result); // sets Base64 image string
  };

  if (file) {
    reader.readAsDataURL(file);
  }
  };


  // Handle Add/Update Doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorData = { name: doctorName, specialization: specialization, availability, photo, description };
  
    try {
      if (editDoctorId) {
        await axios.put(`http://localhost:5000/api/admin/doctors/${editDoctorId}`, doctorData);
      } else {
        await axios.post("http://localhost:5000/api/admin/doctors", doctorData);
      }
      fetchDoctors(); // Refresh the list
      resetForm();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };
  
  const resetForm = () => {
    setDoctorName("");
    setSpecialization("");
    setAvailability("");
    setPhoto("");
    setDescription("");
    setEditDoctorId(null);
  };
  

  // Edit doctor details
  const handleEdit = (doctor) => {
    setDoctorName(doctor.name);
    setSpecialization(doctor.specialization);
    setAvailability(doctor.availability);
    setPhoto(doctor.photo || ""); // Use default value if photo is not provided
    setDescription(doctor.description || ""); // Use default value if description is not provided
    setEditDoctorId(doctor._id); // Use MongoDB _id here
  };
  
  // Delete doctor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return; // Exit if user cancels

    try {
      await axios.delete(`http://localhost:5000/api/admin/doctors/${id}`);
      fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };
  

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Remove stored role if using localStorage
    navigate("/"); // Redirect to Login Page
    window.location.reload(); // Force reload to reset state
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#5D3FD3" }}>Admin Panel - Manage Doctors</h2>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#D9534F",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#B52B27")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#D9534F")}
      >
        Logout
      </button>

      {/* Add/Edit Doctor Form */}
      <form onSubmit={handleSubmit} style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "10px" }}
        />


        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", marginTop: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "80%" }}
          rows={3}
        />
        <br />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#5D3FD3", // Themed Button Color
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4B0082")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#5D3FD3")}
        >
          {editDoctorId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or specialization"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "60%",
            maxWidth: "400px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>


      {/* Doctor List Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "#E6E6FA", color: "#4B0082" }}>
            <th style={{ padding: "10px", borderBottom: "2px solid #5D3FD3" }}>Doctor's name</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #5D3FD3" }}>Specialization</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #5D3FD3" }}>Availability</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #5D3FD3" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors
          .filter((doctor) =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((doctor) => (
            <tr
            key={doctor._id}
            onClick={() => openDoctorModal(doctor)}
            style={{ cursor: "pointer", backgroundColor: editDoctorId === doctor._id ? "#f0e6ff" : "transparent", transition: "background-color 0.3s", }}
            onMouseOver={(e) => {e.currentTarget.style.backgroundColor = "#f0f0ff";}}
            onMouseOut={(e) => {e.currentTarget.style.backgroundColor = editDoctorId === doctor._id ? "#f0e6ff" : "transparent";}}
            >
          
              <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{doctor.name}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{doctor.specialization}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{doctor.availability}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(doctor);
                  }}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#7A5DC7",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "8px",
                    fontWeight: "bold",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#5A4A82")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#7A5DC7")}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(doctor._id);
                  }}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#D9534F",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#B52B27")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#D9534F")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedDoctor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            transition: "opacity 0.3s ease-in-out"
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "25px 20px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0px 10px 25px rgba(0,0,0,0.3)",
              position: "relative",
              textAlign: "center",
              animation: "fadeIn 0.3s ease-in-out"
            }}
          >
            {/* Close button top-right */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: "#999",
                cursor: "pointer"
              }}
              title="Close"
            >
              &times;
            </button>

            <h3 style={{ color: "#5D3FD3", marginBottom: "15px" }}>
              {selectedDoctor.name}
            </h3>

            {selectedDoctor.photo && (
              <img
                src={selectedDoctor.photo}
                alt={selectedDoctor.name}
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "15px",
                  border: "2px solid #5D3FD3"
                }}
              />
            )}

            <p style={{ margin: "8px 0", color: "#333" }}>
              <strong>Specialization:</strong> {selectedDoctor.specialization}
            </p>
            <p style={{ margin: "8px 0", color: "#333" }}>
              <strong>Availability:</strong> {selectedDoctor.availability}
            </p>
            <p style={{ margin: "8px 0", color: "#555", fontStyle: "italic" }}>
              <strong>Description:</strong> {selectedDoctor.description || "No description"}
            </p>

            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px 16px",
                backgroundColor: "#5D3FD3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4B0082")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#5D3FD3")}
            >
              Close
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default AdminPanel;

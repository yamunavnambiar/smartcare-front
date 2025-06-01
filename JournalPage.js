import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEntry, setNewEntry] = useState({ title: "", content: "", mood: "", tags: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [editEntryId, setEditEntryId] = useState(null);
  const [editEntryData, setEditEntryData] = useState({ title: "", content: "", mood: "" });
  const [deleteEntryId, setDeleteEntryId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => { fetchEntries(); }, []);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { filterEntriesByDate(selectedDate); }, [entries, selectedDate]);

  const fetchEntries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/journal", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch entries");
      setEntries(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const filterEntriesByDate = (date) => {
    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getFullYear() === date.getFullYear() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getDate() === date.getDate()
      );
    });
    setFilteredEntries(filtered);
  };

  const createEntry = async () => {
    if (!newEntry.title || !newEntry.content) return setError("Title and content are required");
    setError("");
    try {
      const entryToCreate = { ...newEntry, date: selectedDate };
      const res = await fetch("http://localhost:5000/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(entryToCreate),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create entry");
      setNewEntry({ title: "", content: "", mood: "", tags: [] });
      fetchEntries();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateEntry = async () => {
    if (!editEntryData.title || !editEntryData.content) {
      setError("Title and content are required to update.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/journal/${editEntryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editEntryData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update entry");
      setEditEntryId(null);
      setEditEntryData({ title: "", content: "", mood: "" });
      fetchEntries();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEntry = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/journal/${deleteEntryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete entry");
      setDeleteEntryId(null);
      setShowDeleteConfirm(false);
      fetchEntries();
    } catch (err) {
      setError(err.message);
    }
  };

  const moodColors = {
    Happy: "#d1f7c4",
    Sad: "#c4d1f7",
    Anxious: "#f7c4e1",
    Angry: "#f7c4c4",
    Relaxed: "#c4f7ef",
  };

  const mainStyles = {
    container: {
      padding: "30px",
      maxWidth: "1100px",
      margin: "auto",
      fontFamily: "'Poppins', sans-serif",
      color: "#2d2d2d",
      backgroundColor: "#faf7ff",
    },
    header: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#6a4c93",
      textAlign: "center",
    },
    calendarWrapper: {
      background: "#fff",
      borderRadius: "14px",
      padding: "25px",
      boxShadow: "0 4px 20px rgba(106, 76, 147, 0.08)",
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: 600,
      margin: "20px 0 10px",
      color: "#6a4c93",
    },
    entryCard: {
      background: "#fff",
      borderRadius: "14px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease",
    },
    moodBadge: (mood) => ({
      backgroundColor: moodColors[mood] || "#d1a8e8",
      padding: "6px 14px",
      borderRadius: "12px",
      fontSize: "13px",
      display: "inline-block",
      marginBottom: "10px",
      color: "#333",
      fontWeight: "500",
    }),
    inputField: {
      width: "100%",
      padding: "12px",
      marginBottom: "14px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "15px",
    },
    saveButton: {
      padding: "14px 26px",
      borderRadius: "10px",
      background: "linear-gradient(to right, #6a4c93, #9d71bc)",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
      marginTop: "10px",
    },
    actionButton: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      marginRight: "10px",
      fontSize: "14px",
      fontWeight: "500",
    },
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "#fff",
      borderRadius: "14px",
      padding: "25px",
      width: "400px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  };

  return (
    <div style={mainStyles.container}>
      <h1 style={mainStyles.header}>📝 Your Journal</h1>
      {error && <p style={{ color: "#e63946", textAlign: "center" }}>{error}</p>}

      <div style={mainStyles.calendarWrapper}>
        <h2 style={mainStyles.sectionTitle}>📅 Journal Calendar</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            return entries.some((entry) => {
              const d = new Date(entry.date);
              return (
                d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear()
              );
            }) ? "highlight" : null;
          }}
        />
      </div>

      <h2 style={mainStyles.sectionTitle}>📓 Entries on {selectedDate.toDateString()}</h2>
      {loading ? (
        <p>Loading entries...</p>
      ) : filteredEntries.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#777" }}>No entries for this date.</p>
      ) : (
        filteredEntries.map((entry) => (
          <div key={entry._id} style={mainStyles.entryCard}>
            <div style={mainStyles.moodBadge(entry.mood)}>Mood: {entry.mood || "N/A"}</div>
            <h3 style={{ marginBottom: "8px" }}>{entry.title}</h3>
            <p style={{ lineHeight: "1.6", color: "#444" }}>{entry.content}</p>
            <div style={{ marginTop: "12px" }}>
              <button
                style={{ ...mainStyles.actionButton, backgroundColor: "#6a4c93", color: "#fff" }}
                onClick={() => {
                  setEditEntryId(entry._id);
                  setEditEntryData({
                    title: entry.title,
                    content: entry.content,
                    mood: entry.mood,
                  });
                }}
              >
                ✏️ Edit
              </button>
              <button
                style={{ ...mainStyles.actionButton, backgroundColor: "#e63946", color: "#fff" }}
                onClick={() => {
                  setDeleteEntryId(entry._id);
                  setShowDeleteConfirm(true);
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}

      {editEntryId && (
        <div style={mainStyles.modalBackdrop}>
          <div style={mainStyles.modalContent}>
            <h3 style={{ color: "#6a4c93", marginBottom: "15px" }}>Edit Entry</h3>
            <input
              type="text"
              value={editEntryData.title}
              onChange={(e) => setEditEntryData({ ...editEntryData, title: e.target.value })}
              style={mainStyles.inputField}
              placeholder="Title"
            />
            <textarea
              value={editEntryData.content}
              onChange={(e) => setEditEntryData({ ...editEntryData, content: e.target.value })}
              style={mainStyles.inputField}
              rows={4}
              placeholder="Content"
            />
            <input
              type="text"
              value={editEntryData.mood}
              onChange={(e) => setEditEntryData({ ...editEntryData, mood: e.target.value })}
              style={mainStyles.inputField}
              placeholder="Mood"
            />
            <div style={{ textAlign: "right" }}>
              <button onClick={handleUpdateEntry} style={{ ...mainStyles.actionButton, backgroundColor: "#28a745", color: "#fff" }}>
                ✅ Update
              </button>
              <button onClick={() => setEditEntryId(null)} style={{ ...mainStyles.actionButton, backgroundColor: "#ccc", color: "#333" }}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2 style={mainStyles.sectionTitle}>➕ Add New Entry for {selectedDate.toDateString()}</h2>
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          style={mainStyles.inputField}
        />
        <textarea
          placeholder="Write your thoughts..."
          value={newEntry.content}
          onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
          style={mainStyles.inputField}
          rows={5}
        />
        <input
          type="text"
          placeholder="Mood (e.g., Happy, Anxious)"
          value={newEntry.mood}
          onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
          style={mainStyles.inputField}
        />
        <button onClick={createEntry} style={mainStyles.saveButton}>💾 Save Entry</button>
      </div>

      <style>{`
        .highlight {
          background: #6a4c93 !important;
          color: white !important;
          border-radius: 50% !important;
        }
      `}</style>

      {showDeleteConfirm && (
        <div style={mainStyles.modalBackdrop}>
          <div style={{ ...mainStyles.modalContent, textAlign: "center" }}>
            <p>Are you sure you want to delete this entry?</p>
            <button
              onClick={handleDeleteEntry}
              style={{ ...mainStyles.actionButton, backgroundColor: "#e63946", color: "#fff" }}
            >
              ✅ Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{ ...mainStyles.actionButton, backgroundColor: "#ccc", color: "#333" }}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Function to update mobile state on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo / App Name */}
        <h2 style={styles.logo}>Smart Care</h2>

        {/* Hamburger Menu (Visible only on small screens) */}
        {isMobile && (
          <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburger}>
            ☰
          </button>
        )}

        {/* Navigation Links (Always visible on desktop, toggled on mobile) */}
        <ul
          style={{
            ...styles.navLinks,
            display: isMobile ? (isOpen ? "flex" : "none") : "flex",
          }}
        >
          <li><Link to="/home" style={styles.link}>Home</Link></li>
          <li><Link to="/chatbot" style={styles.link}>Chatbot</Link></li>
          <li><Link to="/book-appointments" style={styles.link}>Book Appointments</Link></li>
          <li><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li><Link to="/logout" style={styles.logoutButton}>Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

// Inline Styles
const styles = {
  navbar: {
    background: "linear-gradient(to right, #E6E6FA, #D8BFD8)", // Soft lavender gradient
    padding: "10px 20px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#4B0082",
    fontSize: "20px",
    fontWeight: "bold",
  },
  hamburger: {
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#4B0082",
    display: "block", // Only shown on mobile
  },
  navLinks: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "row",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#4B0082",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "0.3s",
  },
  logoutButton: {
    textDecoration: "none",
    backgroundColor: "#6A5ACD",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "0.3s",
  },
};

export default Navbar;

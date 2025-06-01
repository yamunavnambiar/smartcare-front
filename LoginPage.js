import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store the token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email", data.user.email);
  
        setUser({ role: data.user.role, email: data.user.email });
  
        // Redirect based on role
        navigate(
          data.user.role === "user"
            ? "/home"
            : data.user.role === "doctor"
            ? "/doctor-panel"
            : "/admin-panel"
        );
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Try again.");
    }
  };
  
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Smart Care</h1>
        <p style={styles.subtitle}>Your trusted platform for mental wellness</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        
        <button style={styles.loginButton} onClick={handleLogin}>Login</button>
        <button style={styles.signupButton} onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #E6E6FA, #D8BFD8)",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  heading: {
    fontSize: "24px",
    color: "#4B0082",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6A5ACD",
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#4B0082",
    display: "block",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #BDB5D5",
    fontSize: "16px",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#6A5ACD",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  signupButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#9370DB", // Slightly different lavender shade
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default LoginPage;

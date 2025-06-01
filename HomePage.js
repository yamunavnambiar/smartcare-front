import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>WELCOME TO SMART CARE</h1>
      <p style={styles.subtitle}>A step towards a healthier mind and happier life.</p>

      {/* Quick Access Buttons */}
      <div style={styles.buttonContainer}>
        <Link to="/chatbot" style={styles.button}>💬 Chat with Our AI</Link>
        <Link to="/book-appointments" style={styles.button}>🩺 Find a Doctor</Link>
        <Link to="/profile" style={styles.button}>🌈 Your Wellness Journey</Link>
      </div>

      {/* Divider */}
      <hr style={styles.divider} />

      {/* Journal Access */}
      <section style={styles.cardSection}>
        
        <div style={styles.cardContainer}>
          <Link to="/journal" style={styles.card}>
            <h3 style={styles.cardTitle}>Your Gratitude Journal</h3>
            <p style={styles.cardText}>Your private space to reflect, release, and rediscover yourself. Document your thoughts, track your moods, and see how far you’ve come.</p>
          </Link>
        </div>
      </section>

      {/* Wellness Tips */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>🌱 Small Steps, Big Impact</h2>
        <ul style={styles.list}>
          <li>🧘‍♀️ Take a moment to breathe — it’s not just calming, it’s healing.</li>
          <li>🌙 Prioritize sleep — your brain restores itself through rest.</li>
          <li>🚶‍♂️ Move with purpose — physical activity clears the mind and uplifts the spirit.</li>
          <li>🥗 Nourish your body and mind — what you consume affects how you feel.</li>
          <li>🤝 Speak and be heard — connection is a powerful form of healing.</li>
        </ul>
      </section>

      {/* Inspirational Quotes */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>💬 A Thought for You</h2>
        <p style={styles.quote}>💜 "Mental health is not a destination but a continuous journey. Care for it like you would any vital part of your being."</p>
        <p style={styles.quote}>🌿 "Healing doesn’t mean forgetting. It means choosing peace over pain, again and again."</p>
      </section>

      {/* Image Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>🌸 Take a Deep Breath</h2>
        <img 
          src="https://images.pexels.com/photos/7593054/pexels-photo-7593054.jpeg" 
          alt="Person Doing a Yoga Pose" 
          style={styles.image}
          onError={(e) => e.target.src = "https://via.placeholder.com/800x400.png?text=Relaxing+Scenery"} 
        />
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 SmartCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Poppins", sans-serif',
    textAlign: "center",
    padding: "40px 20px",
    background: "linear-gradient(to right, #f7f3fc, #eae0f7)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "36px",
    color: "#6a4c93",
    fontWeight: "700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#9d71bc",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  button: {
    textDecoration: "none",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #9d71bc, #d1a8e8)",
    color: "#fff",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(106, 76, 147, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  divider: {
    border: "none",
    height: "1px",
    background: "#d1a8e8",
    margin: "40px auto",
    width: "60%",
  },
  section: {
    backgroundColor: "#ffffff",
    padding: "30px",
    margin: "30px auto",
    borderRadius: "16px",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
    maxWidth: "800px",
  },
  sectionHeading: {
    fontSize: "24px",
    color: "#6a4c93",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    fontSize: "16px",
    color: "#4B0082",
    lineHeight: "1.8",
  },
  quote: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#9d71bc",
    marginBottom: "10px",
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    boxShadow: '0 6px 14px rgba(0,0,0,0.1)',
    marginTop: '20px'
  },
  cardSection: {
    marginTop: "30px",
    width: "100%",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    gap: "20px",
    flexWrap: "wrap",
    width: "100%",
  },
  card: {
    textDecoration: "none",
    padding: "24px",
    width: "90%",
    maxWidth: "800px",
    background: "linear-gradient(145deg, #ffffff, #f0e9f8)",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    color: "#4B0082",
    transition: "transform 0.3s ease",
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "10px",
    fontWeight: "600",
  },
  cardText: {
    fontSize: "16px",
    color: "#6a5acd",
    lineHeight: "1.6",
  },
  footer: {
    marginTop: "50px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
  },
  footerText: {
    fontSize: "14px",
    color: "#888",
  },
};

export default HomePage;

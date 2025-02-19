import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${user.id}`);
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const saveProfile = async () => {
    try {
      await axios.put(`http://localhost:8080/user/${user.id}`, updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return <p style={styles.loading}>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Your Profile</h2>

      <div style={styles.card}>
        {/* Profile Image */}
        {profile.imageData ? (
          <img
            src={`data:image/jpeg;base64,${profile.imageData}`}
            alt="Profile"
            style={styles.profileImage}
          />
        ) : (
          <div style={styles.defaultImage}>No Image</div>
        )}

        {/* Profile Details (Two Columns) */}
        <div style={styles.detailsContainer}>
          <div style={styles.column}>
            <p><strong>Name:</strong> 
              {isEditing ? (
                <input type="text" name="firstName" value={updatedProfile.firstName} onChange={handleChange} style={styles.input} />
              ) : profile.firstName} {profile.lastName}
            </p>
            <p><strong>Email:</strong> 
              {isEditing ? (
                <input type="email" name="email" value={updatedProfile.email} onChange={handleChange} style={styles.input} />
              ) : profile.email}
            </p>
            <p><strong>Phone:</strong> 
              {isEditing ? (
                <input type="text" name="phone" value={updatedProfile.phone} onChange={handleChange} style={styles.input} />
              ) : profile.phone || "Not provided"}
            </p>
            <p><strong>Address:</strong> 
              {isEditing ? (
                <input type="text" name="address" value={updatedProfile.address} onChange={handleChange} style={styles.input} />
              ) : profile.address || "Not provided"}
            </p>
          </div>

          <div style={styles.column}>
            <p><strong>City:</strong> 
              {isEditing ? (
                <input type="text" name="city" value={updatedProfile.city} onChange={handleChange} style={styles.input} />
              ) : profile.city || "Not provided"}
            </p>
            <p><strong>State:</strong> 
              {isEditing ? (
                <input type="text" name="state" value={updatedProfile.state} onChange={handleChange} style={styles.input} />
              ) : profile.state || "Not provided"}
            </p>
            <p><strong>Zip Code:</strong> 
              {isEditing ? (
                <input type="text" name="zipCode" value={updatedProfile.zipCode} onChange={handleChange} style={styles.input} />
              ) : profile.zipCode || "Not provided"}
            </p>
            <p><strong>Country:</strong> 
              {isEditing ? (
                <input type="text" name="country" value={updatedProfile.country} onChange={handleChange} style={styles.input} />
              ) : profile.country || "Not provided"}
            </p>
            <p><strong>Joined On:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Edit & Save Button */}
        {isEditing ? (
          <div style={styles.buttonContainer}>
            <button style={styles.saveButton} onClick={saveProfile}>💾 Save</button>
            <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>❌ Cancel</button>
          </div>
        ) : (
          <button style={styles.editButton} onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  card: {
    background: "linear-gradient(95deg,rgb(155, 155, 158), #764ba2)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    color: "#fff",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  profileImage: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "4px solid #764ba2",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    textAlign: "left",
    marginTop: "10px",
  },
  column: {
    flex: 1,
    fontSize: "15px",
    lineHeight: "1.6",
  },
  input: {
    width: "100%",
    padding: "5px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "none",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },
  editButton: {
    marginTop: "20px",
    padding: "12px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#ff4b5c",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  saveButton: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Profile;

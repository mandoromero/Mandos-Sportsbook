// src/components/Profile/Profile.jsx
import "./Profile.css";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase"; // make sure you have firebase.js setup
import Placeholder from "../../assets/img/placeholder.jpg";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (auth.currentUser && database) {
      const userId = auth.currentUser.uid;
      const userRef = ref(database, "users/" + userId); // <--- CORRECTED: Use 'database'

      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("No user data found for this user.");
          setUserData(null);
        }
        setLoading(false); 
      }, (error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
          setUserData(null);
      });

      return () => unsubscribe();
    } else {
        setLoading(false);
        setUserData(null);
    }
  }, [database, auth.currentUser?.uid]);

  return (
    <div className="profile">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        <img src={Placeholder} alt="default profile" height="200" />
        <p className="profile-greeting">Welcome to your profile page!</p>
        <p className="profile-greeting">Here you can view and edit your profile information.</p>

        <h3 className="profile-subtitle">Your Information</h3>
        {userData ? (
          <>
            <p className="user-info">Name: {userData.firstName} {userData.lastName}</p>
            <p className="user-info">Email: {userData.email}</p>
            <h3>Birthdate</h3>
            <div className="birthdate-container">
              <p>Year: {userData.year}</p>
              <p>Month: {userData.month}</p>
              <p>Day: {userData.day}</p>
            </div>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}

import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
        <div className="profile-container">
            <h2 clasaName="profile-title">User Profile</h2>
            <p className="profile-greeting">Welcome to your profile page!</p>
            <p className="profile-greeting">Here you can view and edit your profile information.</p>
            <h3 className="profile-subtitle">Your Information</h3>
            <p className="user-info">Name: John Doe</p>
            <p className="user-info">UserID:</p>
            <p className="user-info">Email: john.doe@example.com</p>
            <p>Birthdate: 2000-01-01</p>
        </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div className="profile">
      <h2>User Profile</h2>
      <p>Welcome to your profile page!</p>
      <p>Here you can view and edit your profile information.</p>
      <div>
        <h3>Your Information</h3>
        <p>Name: John Doe</p><span><p>UserID:</p></span>
        <p>Email: john.doe@example.com</p>
        <p>Birthdate: 2000-01-01</p>
      </div>
    </div>
  );
}

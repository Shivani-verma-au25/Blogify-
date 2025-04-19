import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleAuthLogin = () => {
  const [user, setUser] = useState(null); // ← store user data here

  useEffect(() => {
    /* global google */
    window.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const idToken = response.credential;

      const result = await axios.post("http://localhost:5000/api/v1/auth/google/callback", {
        idToken,
      });

      console.log('✅ Backend Auth Success:', result.data);
      setUser(result.data.user); // ← store the user in state

    } catch (error) {
      console.error('❌ Auth Error:', error);
    }
  };

  return (
    <div>
      <div id="googleSignInDiv"></div>

      {/* Show user info once logged in */}
      {user && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="Profile" style={{ width: 80, borderRadius: '50%' }} />
        </div>
      )}
    </div>
  );
};

export default GoogleAuthLogin;

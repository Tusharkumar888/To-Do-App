// auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // or use cookies
    // Optionally: Validate token's expiration here if needed
    return token !== null;
  };
  
import { useEffect, useState } from 'react';
import './App.css';
import WELCOME from '../Pages/welcome/welcomePage';
import DASHBOARD from '../Pages/dashBoard/dashBoard';

function App() {
  const [token, setToken] = useState(null); // State to track the token

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Retrieve the token from localStorage
    setToken(storedToken); // Update the token state
  }, []);

  return (
    <>
      {/* Render components based on the presence of a token */}
      {token ? (
        <DASHBOARD /> // Render the dashboard if the token exists
      ) : (
        <WELCOME /> // Render the welcome page if no token exists
      )}
    </>
  );
}

export default App;

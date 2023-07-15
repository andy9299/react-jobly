import React, { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import AppNavBar from './common/AppNavBar';
import { BrowserRouter, redirect } from 'react-router-dom';
import UserContext from './context/UserContext';
import JoblyApi from './api';
import jwt from 'jsonwebtoken';

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          const user = jwt.decode(token);
          setCurrentUser(user);
        }
        catch (err) {
          alert("Error loading user");
          redirect('/');
        }
      }
    }
    getCurrentUser();
  }, [token]);

  async function login(loginInfo) {
    try {
      const newToken = await JoblyApi.getToken(loginInfo);
      JoblyApi.token = newToken.token;
      setToken(newToken.token);
    }
    catch (err) {
      throw err;
    }
  }

  async function register(registerInfo) {
    try {
      const newToken = await JoblyApi.register(registerInfo);
      JoblyApi.token = newToken.token;
      setToken(newToken.token);
    }
    catch (err) {
      alert("Invalid Register");
    }
  }

  function logout() {
    JoblyApi.token = null;
    setToken(null);
  }

  return (
    <UserContext.Provider value={{ login, register, logout, currentUser }}>
      <div className="App">
        <BrowserRouter>
          <AppNavBar />
          <div className='pt-5'>
            <AppRoutes />
          </div>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;

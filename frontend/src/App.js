import React, { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import AppNavBar from './common/AppNavBar';
import { BrowserRouter, redirect } from 'react-router-dom';
import UserContext from './context/UserContext';
import JoblyApi from './api';
import jwt from 'jsonwebtoken';
import useLocalStorageState from './hooks/useLocalStorageState';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorageState('jobly-token', null);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          JoblyApi.token = token;
          setCurrentUser(await JoblyApi.getUser(username));
        }
        catch (err) {
          alert("Error loading user");
          setCurrentUser(null);
          redirect('/');
        }
      }
      else {
        setCurrentUser(null);
      }
    }
    getCurrentUser();
  }, [token]);

  async function login(loginInfo) {
    try {
      const newToken = await JoblyApi.getToken(loginInfo);
      setToken(newToken.token);
    }
    catch (err) {
      throw err;
    }
  }

  async function register(registerInfo) {
    try {
      const newToken = await JoblyApi.register(registerInfo);
      setToken(newToken.token);
    }
    catch (err) {
      throw err;
    }
  }

  async function editProfile(userDetails) {
    try {
      const editedUser = await JoblyApi.editUser(currentUser.username, userDetails);
      setCurrentUser(editedUser);
    }
    catch (err) {
      throw err;
    }
  }

  async function apply(jobId) {
    try {
      await JoblyApi.applyJob(currentUser.username, jobId);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        applications: [...currentUser.applications, jobId]
      }));
    }
    catch (err) {
      throw err;
    }
  }

  function logout() {
    JoblyApi.token = null;
    setToken(null);
  }

  return (
    <UserContext.Provider value={{
      login,
      register,
      logout,
      editProfile,
      apply,
      currentUser
    }}>
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

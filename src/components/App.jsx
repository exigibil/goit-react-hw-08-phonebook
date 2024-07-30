import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Phonebook from './Phonebook/Phonebook';
import LoginPage from './Login/Login';
import RegisterPage from './Register/Register';
import styles from './Login/Login.module.css';
import Navbar from './Navbar/Navbar';



export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div
        className={styles.appContainer}
        style={{
          height: '100vh',
          padding: 50,
          justifyContent: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <header>
          {isLoggedIn? (
            <Navbar />
          ) : (
            <div className={styles.navLink} > 
              Wellcome
            </div>
          )}
          <h1>AEM Contact Agenda</h1>
        </header>
        <main>
          {isLoggedIn ? (
            <Phonebook />
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};
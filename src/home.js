import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { API } from './api-service';
import './home.css';
import Navbar from "./components/Navbar/Navbar";


function Homepage() {
  const [cookies] = useCookies(['mr-token']);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!cookies['mr-token']) {
      window.location.href = '/';
    } else {
      API.studentOrOffice(cookies['mr-token'])
        .then((resp) => {
          if (resp === 2) {
            // office
            window.location.href = '/office';
          }
          if (resp === 3) {
            // error
            alert('error');
          }
        })
        .catch((error) => console.log(error));

      API.getUserDetails(cookies['mr-token'])
        .then((resp) => setUser(resp["user"]))
        .catch((error) => console.log(error));
    }
  }, [cookies]);


  return (
    <div className="homepage">
      <Navbar active ='דף הבית'  />
      
      
        {user ? (
        <div className="container">
        <div className="welcome-message">
        <h2>Welcome, {user.first_name}!</h2>
          </div>
          <div className="user-details-container">            
            <div className="user-details-row">
              <span className="field-value">{user.email}</span>
              <span className="field-label">:אימייל</span>
            </div>
            <div className="user-details-row">
              <span className="field-value">{user.first_name}</span>
              <span className="field-label">:שם פרטי</span>
              
            </div>
            <div className="user-details-row">
              
              <span className="field-value">{user.last_name}</span>
              <span className="field-label">:שם משפחה</span>
            </div>
            <div className="user-details-row">
              <span className="field-value">{user.last_connected}</span>
              <span className="field-label">:חיבור אחרון</span>
              
            </div>
          </div>
       
      </div>
       ) : (
          <p className="loading-message">Loading...</p>
        )}
    </div>
  );
}

export default Homepage;

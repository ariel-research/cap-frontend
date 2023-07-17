import React, { useEffect, useState } from 'react';
import { useCookies} from 'react-cookie';
import { API } from './api-service';
import './home.css';
import Navbar from "./components/Navbar/Navbar";

function Homepage() {
  const [token] = useCookies(['mr-token']);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token['mr-token']) {
      window.location.href = '/';
    } else {
      API.studentOrOffice(token['mr-token'])
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
    }
  }, [token]);

  useEffect(() => {

      API.getStudentDetails(token['mr-token'])
        .then((resp) => {
          localStorage.setItem('studentDetails', JSON.stringify(resp));
          setProfile(resp);
        })
        .catch((error) => console.log(error));
    }, [token]);

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "amount_elective") {
    setProfile(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  } else {
    setProfile(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [fieldName]: value
      }
    }));
  }
  };

  const handleSaveChanges = () => {
    console.log("trying to save changes...")
    API.updateStudentDetails({profile},token['mr-token'])
    .then((resp) => {
      localStorage.setItem('studentDetails', JSON.stringify(profile));
      alert(resp["message"]);
    })
    .catch((error) => console.log(error));
    
  };

  return (
    <div className="homepage">
      <Navbar active="דף הבית" />

      {profile ? (
        <div className="container">
          <div className="welcome-message">
            <h2>שלום, {profile.user.first_name}!</h2>
          </div>
          <div className="user-details-container">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">אימייל:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={profile.user.email}
                  disabled
                
                />
              </div>
              </div>
              <div className="form-group row">
              <label className="col-sm-4 col-form-label">מספר תעודת זהות:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={profile.student_id}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">שם פרטי:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={profile.user.first_name}
                  onChange={(e) => handleFieldChange('first_name', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">שם משפחה:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={profile.user.last_name}
                  onChange={(e) => handleFieldChange('last_name', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">קורסי בחירה נדרשים:</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  value={profile.amount_elective}
                  onChange={(e) => handleFieldChange('amount_elective',parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12 text-center">
                <button className="btn btn-primary " onClick={handleSaveChanges}>
                  שמירת שינויים
                </button>
                <a href="/home"> <button className="btn btn-secondary ">
                 ביטול
                </button></a>
              </div>
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

import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { API } from '../../api/api-service';
import { isValidIsraeliID } from '../Registration/FieldValidators'
import './Profile.css';
import Navbar from "../Navbar/Navbar";
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
        //localStorage.setItem('studentDetails', JSON.stringify(resp));
        setProfile(resp);
      })
      .catch((error) => console.log(error));
  }, [token]);


  const handleUserFieldChange = (fieldName, value) => {
      setProfile(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [fieldName]: value
        }
      }));
  };
  const handleStudentFieldChange = (fieldName, value) => {
      if (fieldName==='amount_elective' && ( isNaN(value) || (value < 1 || value > 6))){
        return;
      }
      setProfile(prevState => ({
        ...prevState,
        [fieldName]: value
      }));
  };

  const handleSaveChanges = () => {
    if (!profile.user.first_name || !profile.user.last_name) {
      alert("שם נדרש");
    }
    else if (!isValidIsraeliID(profile.student_id)) {
      alert("מספר תעודת זהות לא תקין ");
    }

    else {
      console.log("trying to save changes...")
      API.updateStudentDetails({ profile }, token['mr-token'])
        .then((resp) => {
          localStorage.setItem('studentDetails', JSON.stringify(profile));
          alert(resp["message"]);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="homepage">
      <Navbar active="פרטים אישיים" />

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
                  onChange={(e) => handleStudentFieldChange('student_id', e.target.value)}
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
                  onChange={(e) => handleUserFieldChange('first_name', e.target.value)}
                  required
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
                  onChange={(e) => handleUserFieldChange('last_name', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">מסלול לימודים:</label>
                <div className="dropdown">
                <select name="program" value={profile.program} onChange={(e) => handleStudentFieldChange('program', parseInt(e.target.value))}>
                  <option value="1">בסיסי</option>
                  <option value="2">מצטיינים</option>
                </select>
            </div>
          </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">קורסי בחירה נדרשים:</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  value={profile.amount_elective}
                  min={1}
                  max={6}
                  onChange={(e) => handleStudentFieldChange('amount_elective', parseInt(e.target.value))}
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

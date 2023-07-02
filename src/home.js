import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { API } from './api-service';
import './home.css';
import Navbar from "./components/Navbar/Navbar";

function Homepage() {
  const [cookies] = useCookies(['mr-token']);
  const [user, setUser] = useState("");
  const [editedUser, setEditedUser] = useState("");
  const [numCourses, setNumCourses] = useState(0);

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
        .then((resp) => {
          setUser(resp["user"]);
          setEditedUser(resp["user"]);
        })
        .catch((error) => console.log(error));
    }
  }, [cookies]);

  const handleFieldChange = (fieldName, value) => {
    setEditedUser(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSaveChanges = () => {
    // Perform the save operation here using the API
    // Example: API.updateUserDetails(cookies['mr-token'], editedUser)
    // .then(() => {
    //   // Handle success
    //   console.log("User details saved successfully!");
    // })
    // .catch((error) => {
    //   // Handle error
    //   console.log("Error saving user details:", error);
    // });
    // For this example, we'll just update the user state directly
    setUser(editedUser);
  };

  return (
    <div className="homepage">
      <Navbar active="דף הבית" />

      {user ? (
        <div className="container">
          <div className="welcome-message">
            <h2>Welcome, {user.first_name}!</h2>
          </div>
          <div className="user-details-container">
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">:אימייל</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={editedUser.email}
                  disabled
                
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">:שם פרטי</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={editedUser.first_name}
                  onChange={(e) => handleFieldChange('first_name', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">:שם משפחה</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={editedUser.last_name}
                  onChange={(e) => handleFieldChange('last_name', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">:חיבור אחרון</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  value={""}
                  
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">:קורסי בחירה נדרשים</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  value={numCourses}
                  onChange={(e) => setNumCourses(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save
                </button>
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

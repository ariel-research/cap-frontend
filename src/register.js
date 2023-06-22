import React, { useState } from 'react';
import { API } from './api-service';
import './register.css';
import { validate } from 'email-validator';

function Register() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [message,setMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'first_name') setFirstname(value);
    if (name === 'last_name') setLastname(value);
    if (name === 'email') {
      setEmail(value);
      setUsername(value);
      
    }
    if (name === 'password1') setPassword1(value);

    if (name === 'password2') setPassword2(value);
  };

  const validateForm = () => {
    const errors = {};

    if (!first_name) {
      errors.firstname = 'Please enter your first name';
    }
    if (!last_name) {
      errors.lastname = 'Please enter your last name';
    }


    if (!email) {
      errors.email = 'Please enter your email';
    } else if (!isEmailValid(email)) {
      errors.email = 'Please enter a valid email address';
    } else if (!isEmailAriel(email)){
      errors.email = 'Email address must be associated with Ariel university';
    }

    if (!password1) {
      errors.password1 = 'Please enter your password';
    }

    if (!password2) {
      errors.password2 = 'Please confirm your password';
    } else if (password1 !== password2) {
      errors.password2 = 'Passwords do not match';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isEmailValid = (email) => {
    return validate(email);

  };

  const isEmailAriel = (email) => {
    return email.endsWith('ariel.ac.il');
  };

  const registerClicked = () => {
    if (!validateForm()) {
      return;
    }
    API.registerUser({ username, first_name,last_name, email, password1, password2 })
      .then((resp) => {
        console.log(resp); // Add this line
          setMessage(resp['message'])
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      })
  };

  return (
    <div className="register">
      <div className="headline">הרשמה</div>
      <div className="container">
        <div className="form-container"> 
          <div className="form-row">
            <input
              className="field-input"
              type="text"
              name="first_name"
              value={first_name}
              onChange={handleInputChange}
            />
            <label className="field-label">:שם פרטי</label>
            {errors.firstname && <span className="error">{errors.firstname}</span>}
          </div>
          <div className="form-row">
            <input
              className="field-input"
              type="text"
              name="last_name"
              value={last_name}
              onChange={handleInputChange}
            />
            <label className="field-label">:שם משפחה</label>
            {errors.lastname && <span className="error">{errors.lastname}</span>}
          </div>
          <div className="form-row">
            
            <input
              className="field-input"
              type="email"
              placeholder="כתובת המייל הארגוני"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <label className="field-label">:דוא"ל</label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-row">
            
            <input
              className="field-input"
              type="password"
              name="password1"
              value={password1}
              onChange={handleInputChange}
            />
            <label className="field-label">:סיסמא</label>
            {errors.password1 && <span className="error">{errors.password1}</span>}
          </div>
          <div className="form-row">
            
            <input
              className="field-input"
              type="password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <label className="field-label">:אימות סיסמא</label>
            {errors.password2 && <span className="error">{errors.password2}</span>}
          </div>
          <button className="register-button" type='submit' onClick={registerClicked}>
            !תרשמו אותי
          </button>
          {message && <span className="message">{message}</span>}
        </div>
      </div>
    </div>
  );
}

export default Register;

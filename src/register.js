/*import React, { useState } from 'react';
import { API } from './api-service';
import './register.css';
import { validate } from 'email-validator';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const registerClicked = () => {
    if (!username || !email || !password) {
        alert('Please fill in all fields');
    } else if (!validate(email)) {
    alert('Please enter a valid email address');
    } else if (!email.endsWith('@ariel.ac.il')) {
    alert('Only email addresses from @yourdomain.com are allowed');
    } else {
      API.registerUser({ username, password, email })
        .then(resp => {
          if (resp.success) {
            alert('Registration successful!');
            // Optionally, redirect the user to another page after successful registration
          } else {
            alert(resp.message);
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="register">
      <div className="title">Registration</div>
      <div className="container">
        <div className="form-container">
          <div className="form-row">
            <label className="field-label">Username:</label>
            <input
              className="field-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={evt => setUsername(evt.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="field-label">Email:</label>
            <input
              className="field-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={evt => setEmail(evt.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="field-label">Password:</label>
            <input
              className="field-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={evt => setPassword(evt.target.value)}
            />
          </div>
          <button className="register-button" onClick={registerClicked}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;*/

import React, { useState } from 'react';
import { API } from './api-service';
import './register.css';
import { validate } from 'email-validator';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = 'Please enter your username';
    }

    if (!email) {
      errors.email = 'Please enter your email';
    } else if (!isEmailValid(email)) {
      errors.email = 'Please enter a valid email address';
    } else if (!isEmailAriel(email)){
        errors.email = 'email address muse be associated with Ariel university';
    }

    if (!password) {
      errors.password = 'Please enter your password';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isEmailValid = (email) => {
    // Perform email validation logic here
    // You can use the email-validator library or any other email validation method
    // Return true if the email is valid, false otherwise
    // For example, using the email-validator library:
    return validate(email);

  };

  const isEmailAriel = (email) => {
    // Perform email validation logic here
    // You can use the email-validator library or any other email validation method
    // Return true if the email is valid, false otherwise
    // For example, using the email-validator library:
    return email.endsWith('@ariel.ac.il');

  };
  const registerClicked = () => {
    if (!validateForm()) {
      return;
    }

    API.registerUser({ username, email, password })
      .then((resp) => {
        if (resp.token) {
          // Handle successful registration
          alert('Registration successful!');
          // Redirect to login page or perform any other necessary actions
        } else {
          // Handle registration error
          alert('Registration failed. Please try again.');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="register">
      <div className="title">Registration</div>
      <div className="container">
        <div className="form-container">
          <div className="form-row">
            <label className="field-label">Username:</label>
            <input
              className="field-input"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-row">
            <label className="field-label">Email:</label>
            <input
              className="field-input"
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-row">
            <label className="field-label">Password:</label>
            <input
              className="field-input"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button className="register-button" onClick={registerClicked}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
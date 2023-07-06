import React, { useState } from 'react';
import { API } from './api-service';
import './register.css';
import { validate } from 'email-validator';
import logo1 from './logo.png';


function Register() {

  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [message,setMessage] = useState('');
  const [validated,setValidated] = useState('');
  const [user_type,setUserType] = useState('student');
  const [amount_elective, setAmountElective] = useState(6);

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

    if(name === 'amount_elective'){
      if (value > 0 && value <= 6)
        setAmountElective(value);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!first_name) {
      errors.firstname = 'שם פרטי נדרש';
    }
    if (!last_name) {
      errors.lastname = 'שם משפחה נדרש';
    }


    if (!email) {
      errors.email = 'כתומת אימייל נדרש';
    } else if (!isEmailValid(email)) {
      errors.email = 'כתובת אימייל לא חוקית';
    } else if (!isEmailAriel(email)){
      errors.email = 'כתובת האימייל חייבת להסתיים בariel.ac.il';
    }

    if (!password1) {
      errors.password1 = 'סיסמא נדרשת';
    }

    if (!password2) {
      errors.password2 = 'אימות סיסמא נדרש';
    } else if (password1 !== password2) {
      errors.password2 = 'סיסמאות לא תואמות';
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

  const registerClicked = (event) => {
    event.preventDefault(); // Prevent form submission and page refresh

    if (!validateForm()) {
      setValidated(true)
      return;
    }
    
    API.registerUser({ username, first_name,last_name, email, password1, password2,amount_elective, user_type})
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
  <div className="register" >
    <main className="form-signup w-100 m-auto">
      <form  className= "needs-validation" novalidate validate={validated}>
        <img className="mb-4" src={logo1} alt="" width="75" height="65" />
        <h1 className="h3 mb-3 fw-normal text-center">הרשמו והתחילו לדרג!</h1>
        {message && <span>
                        <div class="alert alert-danger d-flex align-items-center text-center" role="alert">{message}</div>
                    </span>}

        <div className="mb-2 ">
          <label className=" d-flex text-right form-label is-invalid">שם פרטי</label>
          <input
            className="form-control field-input "
            type="text"
            placeholder="שם פרטי"
            name="first_name"
            value={first_name}
            onChange={handleInputChange}
            required
          />
          
          {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
        </div>

        <div className=" mb-2">
          <label className="d-flex text-right form-label is-invalid">שם משפחה</label>
          <input
            className="form-control  "
            type="text"
            placeholder="שם משפחה"
            name="last_name"
            value={last_name}
            onChange={handleInputChange}
            required
          />
          
          {errors.lastname && <div className="invalid-feedback">{errors.lastname} </div>}
        </div>

        <div className=" mb-2">
          <label className="d-flex text-right form-label is-invalid">אימייל</label>
          <input
            className="form-control field-input left "
            type="email"
            placeholder="כתובת המייל הארגוני"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          
          {errors.email && <span className="invalid-feedback">{errors.email}</span>}
        </div>

        <div className=" mb-2">
          <label className="d-flex text-right form-label is-invalid">סיסמא</label>
          <input
            className="form-control field-input left "
            type="password"
            placeholder="סיסמה"
            name="password1"
            value={password1}
            onChange={handleInputChange}
            required
          />
          
          {errors.password1 && <span className="invalid-feedback">{errors.password1}</span>}
        </div>

        <div className=" mb-2">
          <label className="d-flex text-right form-label is-invalid">אימות סיסמא</label>
          <input
            className="form-control field-input left "
            type="password"
            placeholder="אימות סיסמא"
            name="password2"
            value={password2}
            onChange={handleInputChange}
            required
          />
          
          {errors.password2 && (
            <span className="invalid-feedback">{errors.password2}</span>
          )}
        </div>
        <div className=" mb-2">
          <label className="d-flex text-right form-label">מספר קורסי בחירה נדרשים</label>
          <input
                type="number"
                name="amount_elective"
                onChange={handleInputChange}
                value={amount_elective}
                min={0}
                max={6}/>
        </div>
        <div class="btn-group item-center">
  <input type="radio" class="btn-check" name="userType" id="student" autocomplete="off" onClick={()=>setUserType('student')} checked ={user_type === 'student'}/>
  <label class="btn btn-outline-primary" for="student">סטודנטים</label>

  <input type="radio" class="btn-check" name="userType" id="guest" autocomplete="off" onClick={()=>setUserType('guest')} checked ={user_type === 'guest'} />
  <label class="btn btn-outline-primary" for="guest">אורחים</label>
</div>
        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" onClick={registerClicked}>
          הרשמה
        </button>
        <p className="text-center text-muted mt-5 mb-0">כבר יש לך חשבון? <a href="/"
                    className="fw-bold text-body pr"><u>התחברו כאן!</u></a></p>
      </form>
    </main>
  </div>
)}

export default Register;

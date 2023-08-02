import React, { useState } from 'react';
import { API } from '../../api/api-service';
import './SignForms.css';
import { validate } from 'email-validator';
import {isValidIsraeliID, isEmailAriel} from './FieldValidators'
import logo1 from '../../logo.png';
import { isNumber } from 'mathjs';


function Register() {

  const [student_id, setStudentId] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [validated, setValidated] = useState('');
  //const [user_type, setUserType] = useState('student');
  const [amount_elective, setAmountElective] = useState(6);
  const [program, setProgram] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'student_id') setStudentId(value);
    if (name === 'first_name') setFirstname(value);
    if (name === 'last_name') setLastname(value);
    if (name === 'email') {
      setEmail(value);

    }
    if (name === 'password1') setPassword1(value);

    if (name === 'password2') setPassword2(value);

    if (name === 'amount_elective') {
      if (isNumber(value) &&(value > 0 && value <= 6))
        setAmountElective(value);
    }
    if (name === 'program') {
      setProgram(value)
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!student_id) {
      errors.student_id = ' מספר ת.ז נדרש';
    }else if (!isValidIsraeliID(student_id)){
      errors.student_id = 'מספר ת.ז לא תקין';
    }
    if (!first_name) {
      errors.firstname = 'שם פרטי נדרש';
    }
    if (!last_name) {
      errors.lastname = 'שם משפחה נדרש';
    }


    if (!email) {
      errors.email = 'כתובת אימייל נדרשת';
    } else if (!isEmailValid(email)) {
      errors.email = 'כתובת אימייל לא חוקית';
    } else if (!isEmailAriel(email)) {
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
    if (!amount_elective){
      errors.amount_elective = 'מספר קורסי בחירה נדרש'
    }

    if (!program){
      errors.program = 'מסלול לימודים נדרש'
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isEmailValid = (email) => {
    return validate(email);

  };

  const registerClicked = (event) => {
    event.preventDefault(); // Prevent form submission and page refresh

    if (!validateForm()) {
      setValidated(true)
      return;
    }
  
    //add user_type if needed
    API.registerUser({student_id,first_name, last_name, email, password1, password2, amount_elective,program })
      .then((resp) => {
        console.log(resp); // Add this line
        setMessage(resp['message'])
      })
      .catch((error) => {
        console.log(error);
        setMessage(error);
      })
  };

  return (
    <div className="register" >
      <main className="form-signup w-100 m-auto">
        <form className="needs-validation" noValidate validate={validated}>
          <img className="mb-4" src={logo1} alt="" width="75" height="65" />
          <h1 className="h3 mb-3 fw-normal text-center">הרשמו והתחילו לדרג!</h1>
          {message && <span>
            <div className="alert alert-danger d-flex align-items-center text-center" role="alert">{message}</div>
          </span>}

          <div className=" mb-2">
            <label className="d-flex text-right form-label is-invalid">מספר תעודת זהות</label>
            <input
              className="form-control field-input "
              type="text"
              placeholder="מס' תעודת זהות"
              name="student_id"
              value={student_id}
              onChange={handleInputChange}
              pattern="[0-9]+"
              required
            />

            {errors.student_id && <span className="invalid-feedback">{errors.student_id}</span>}
          </div>
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

          <label className="d-flex text-right form-label is-invalid">מסלול לימודים</label>
          <div className="dropdown">
            <select name="program" value={program} onChange={handleInputChange}  required>
              <option value="">בחרו מסלול</option>
              <option value="1">בסיסי</option>
              <option value="2">מצטיינים</option>
            </select>
          </div>
          {errors.program && (
              <span className="invalid-feedback">{errors.program}</span>
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
              max={6} 
              required
              />
              
               {errors.amount_elective && (
              <span className="invalid-feedback">{errors.amount_elective}</span>
            )}
          </div>
          {/*<div className="btn-group item-center w-100">
            <input type="radio" className="btn-check" name="userType" id="student" autocomplete="off" onClick={() => setUserType('student')} checked={user_type === 'student'} />
            <label className="btn btn-outline-primary" for="student">סטודנטים</label>

            <input type="radio" className="btn-check" name="userType" id="guest" autocomplete="off" onClick={() => setUserType('guest')} checked={user_type === 'guest'} />
            <label className="btn btn-outline-primary" for="guest">אורחים</label>
               </div>*/}
          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit" onClick={registerClicked}>
            הרשמה
          </button>
          <p className="text-center text-muted mt-5 mb-0">כבר יש לך חשבון? <a href="/"
            className="fw-bold text-body pr"><u>התחברו כאן!</u></a></p>
        </form>
      </main>
    </div>
  )
}

export default Register;

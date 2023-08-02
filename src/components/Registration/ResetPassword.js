import React, { useState} from 'react';
import { API } from '../../api/api-service';
import './SignForms.css';
import logo1 from '../../logo.png';
import { useHistory } from 'react-router-dom';

function ResetPass() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const history = useHistory();
    const [message, setMessage] = useState('');

    const resetClicked = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh

        if (!email) {
            setMessage("כתובת האימייל חסרה")
            setIsButtonDisabled(true)
        } else {

            API.ResetPasswordEmail({email})
                .then(resp => {
                    setMessage("קוד לאיפוס סיסמא נשלח לכתובת האימייל שהזנת");
                    if( resp.status === 1)
                        setIsButtonDisabled(false)
                })
                .catch(error => {
                     console.log(error)
                     setMessage("אירעה שגיאה במהלך שליחת 'הקוד לאיפוס הסיסמא. אנא פנו לתמיכה");
                })
        }

    }
    const resetCodeClicked = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        API.ResetPasswordCode({"token" : code})
        .then(resp => {
            history.push('/new_password?token=' + code);

        })
        .catch(error => console.log(error))

    }

    return (
        <div className="login">

            <main className="form-signin w-100 m-auto">

                <form>
                    <img className="mb-4" src={logo1} alt="" width="75" height="65" />
                    <h1 className="h3 mb-3 fw-normal text-center">איפוס סיסמא</h1>
                    <h5 className="h5 mb-3 fw-normal text-center">הכניסו את כתובת האימייל ונשלח אליכם קוד לאיפוס הסיסמא</h5>
                    {message && <span>
                        <div className="alert alert-danger d-flex align-items-center" role="alert">{message}</div>
                    </span>}
                    <label className='form-label d-flex text-right mb-1' htmlFor="">אימייל</label>
                    <input data-testid="email" type="email" className="form-control left" id="floatingInput" placeholder="name@example.ariel.ac.il"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)} />

                    <button className="btn btn-primary mt-2 py-2 d-flex item-center" data-testid="resetButton" type="submit" onClick={resetClicked}>שליחה</button>

                    <label className='form-label d-flex text-right mt-2 mb-1' htmlFor="">קוד האיפוס</label>
                    <input type="text" data-testid="code" className="form-control left" id="floatingInput" placeholder="קוד איפוס סיסמא"
                        value={code} onChange={evt => setCode(evt.target.value)} />
                    <button className="btn btn-primary mt-2 w-100 py-2" data-testid="ResetCodeButton"
                     type="submit" onClick={resetCodeClicked} disabled={isButtonDisabled}>איפוס</button>

                </form>
                <p className="text-center text-muted mt-5 mb-0">נזכרת בסיסמא?<a href="/"
                    className="fw-bold text-body pr"><u>התחברו כאן!</u></a></p>
                <p className="text-center text-muted mt-2 mb-0">עדיין לא נרשמת? <a href="/register"
                    className="fw-bold text-body"><u>הרשמה כאן!</u></a></p>

            </main>
        </div>
    );
}

export default ResetPass;

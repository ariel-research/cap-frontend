import React, { useState, useEffect } from 'react';
import { API } from '../../api/api-service';
import { useCookies } from "react-cookie";
import './SignForms.css';
import logo1 from '../../logo.png';

function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useCookies(['mr-token']);
    const [message, setMessage] = useState('');

    const loginClicked = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh

        if (!username || !password) {
            setMessage("אימייל או סיסמא ריקים")
        } else {
            API.loginUser({ username, password })
                .then(resp => {
                    if (resp.token) {
                        setToken('mr-token', resp.token)
                        console.log(token)
                    } else {
                        API.getUserStatus(username)
                            .then(resp => {
                                setMessage(resp.message)
                                console.log(message)
                            })
                            .catch(error => console.log(error))
                    }
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        if (token['mr-token']) {
            API.studentOrOffice(token['mr-token'])
                .then(resp => {
                    if (resp === 1) //student
                        window.location.href = '/home';
                    if (resp === 2) //office
                        window.location.href = '/office';
                    if (resp === 3) //error
                        alert("error")
                })
                .catch(error => console.log(error))
        }
    }, [token])

    return (
        <div className="login">

            <main className="form-signin w-100 m-auto">

                <form>
                    <img className="mb-4 center" src={logo1} alt="" width="75" height="65" />
                    <h1 className="h3 mb-3 fw-normal text-center">התחברו ודרגו!</h1>

                    {message && <span>
                        <div class="alert alert-danger d-flex align-items-center" role="alert">{message}</div>
                    </span>}
                    <label className='form-label d-flex text-right mb-1' htmlFor="">אימייל</label>
                    <input data-testid="email" type="email" className="form-control left" id="floatingInput" placeholder="name@example.ariel.ac.il"
                        value={username}
                        onChange={evt => setUsername(evt.target.value)} />
                    <label className='form-label d-flex text-right mt-2 mb-1' htmlFor="">סיסמא</label>
                    <input type="password" data-testid="password" className="form-control left" id="floatingPassword" placeholder="Password"
                        value={password} onChange={evt => setPassword(evt.target.value)} />
 
                    <button className="btn btn-primary w-100 py-2" data-testid="loginButton" type="submit" onClick={loginClicked}>התחברות</button>
                    <div class="text-center text-muted mt-5 mb-0">שכחת את הסיסמא? <a href="/reset_password"
                    class="fw-bold text-body"><u>איפוס הסיסמא</u></a></div>
                </form>
                <p class="text-center text-muted mt-5 mb-0">עדיין לא נרשמת? <a href="/register"
                    class="fw-bold text-body"><u>הרשמה כאן!</u></a></p>
            </main>
        </div>
    );
}

export default Auth;

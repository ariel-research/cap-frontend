import React, { useState, useEffect } from 'react';
import { API } from './api-service';
import { useCookies } from "react-cookie";
import './login.css';
import logo1 from './logo.png';
import { Link} from 'react-router-dom';

function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useCookies(['mr-token']);
    const [message,setMessage] = useState('');

    const loginClicked = () => {
        if (!username || !password) {
            alert("שם משתמש או סיסמא ריקים");
        }
        else {
            API.loginUser({ username, password })
                .then(resp => {
                    if (resp.token) {
                        setToken('mr-token', resp.token)
                        console.log(token)
                    }
                    else {
                        API.getUserStatus(username)
                        .then(resp => {
                            setMessage(resp.message)
                            console.log(message)
                        })
                        .catch(error=> console.log(error))
                    }
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        if (token['mr-token'])
        {
            API.studentOrOffice(token['mr-token'])
            .then(resp => {
                if(resp === 1) //student
                    window.location.href = '/home';
                if(resp === 2) //office
                    window.location.href = '/office';
                if(resp === 3) //error
                    alert("error")
            })
            .catch(error => console.log(error))
        } 
    }, [token])

    return (
        <div className="login">
            <Link to="/register">
            <button className="button-register">
                הרשמה
            </button>
            </Link>
            <main className="form-signin w-100 m-auto login">

  <form>
    <img className="mb-4" src={logo1} alt="" width="75" height="65"/>
    <h1 className="h3 mb-3 fw-normal text-center">התחברו ודרגו!</h1>
    {message && <span className="message">{message}</span>}
    <div className="form-floating mb-2">
    <input data-testid="email" type="email" className="form-control left" id="floatingInput" placeholder="name@example.ariel.ac.il"
      value={username}
      onChange={evt => setUsername(evt.target.value)} />
      <label className='right' htmlFor="floatingInput">אימייל</label>
      </div>
    <div className="form-floating mb-2">
    <input type="password" data-testid="password" className="form-control left" id="floatingPassword" placeholder="Password"
      value={password}  onChange={evt => setPassword(evt.target.value)}/>
      <label className='right' htmlFor="floatingPassword">סיסמא</label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit" onClick={loginClicked} >התחברות</button>
  </form> 
  </main>
  </div>
 
  )
}

export default Auth;
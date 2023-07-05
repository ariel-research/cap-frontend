import React, { useState, useEffect } from 'react';
import { API } from './api-service';
import { useCookies } from "react-cookie";
import './auth.css';
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
                    }
                    else {
                        API.getUserStatus(username)
                        .then(resp => {
                            setMessage(resp.message)
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
        <div className="auth">
            <Link to="/register">
            <button className="button-register">
                הרשמה
            </button>
            </Link>
            <div className="headline">דירוג קורסי בחירה</div>
            <div className="headline"></div>
            <div className="headline">כניסה למערכת</div>
            <div className="container-auth">
                <div className="img-con">
                    <img className="fab fa-react" src={logo1} alt="" />
                </div>
                {message && <span className="message">{message}</span>}
                <div className="row-container">
                    <input data-testid="password" id="password" type="password" placeholder="" value={password}
                        onChange={evt => setPassword(evt.target.value)} /><br /><br />
                    <label className="text-password" htmlFor="password">: סיסמא</label><br />
                </div>
                <div className="row-container">
                    <input data-testid="username" id="username" type="text" placeholder="" value={username}
                        onChange={evt => setUsername(evt.target.value)} /><br />
                    <label className="text-username" htmlFor="username">: שם משתמש/ת</label><br />
                </div>
                
            </div>
            
            <div>
                <button data-testid="loginButton" className="Login-button" onClick={loginClicked}>התחברות</button>
                
            </div>
        
        </div>)
}

export default Auth;
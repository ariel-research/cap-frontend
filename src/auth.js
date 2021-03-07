import React, {useState, useEffect} from 'react';
import {API} from './api-service';
import { useCookies } from "react-cookie";
import './auth.css';

function Auth()
{
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ token, setToken ] = useCookies(['mr-token']);


    const loginClicked = () => {
        API.loginUser( {username,password} )
        .then( resp => { 
            if(resp.token)
            {
                setToken('mr-token', resp.token)
            }
            else{
                alert("סיסמה לא נכונה");
            }
        })
        .catch( error => console.log(error))
    }

    useEffect( () => {
        console.log(token);
        if(token['mr-token']) window.location.href = '/courses_info';
    }, [token])
  
    return (
        <div className="auth">
            <h3>כניסה למערכת</h3>
            <div className="container">
                <div className="row-container">
                    <input id="password" type="password" placeholder="" value={password}
                    onChange={ evt => setPassword(evt.target.value)}/><br /><br />     
                    <label className="text-password" htmlFor="password">: סיסמא</label><br />
                </div>
                <div className="row-container">
                    <input id="username" type="text" placeholder="" value={username}
                    onChange={ evt => setUsername(evt.target.value)}/><br />
                    <label className="text-username" htmlFor="username">: שם משתמש/ת</label><br />
                </div>
            </div>
            <div>
                <button className="Login-button" onClick={loginClicked}>התחברות</button> 
            </div>
        </div>    )
}

export default Auth;
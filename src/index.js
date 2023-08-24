import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Info/CoursesInfo';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import Ranking from './components/Ranking/Ranking';
import Results from './components/Results/Results';
import Algo from './components/Office/algo';
import Office from './components/Office/Office'
import Auth from './components/Registration/SignIn';
import Reg from './components/Registration/SignUp'
import ResetPass from './components/Registration/ResetPassword'
import VerifyUser from './components/Registration/VerifyUser'
import NewPassword from './components/Registration/NewPassword'
import Homepage from './components/Profile/Profile'
import About from './components/About/About';
import Footer from './components/Footer/Footer'
import { CookiesProvider } from "react-cookie";

export default function Router() {

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path="/" component={Auth}/>
          <Route exact path="/register" component={Reg}/>
          <Route exact path="/courses_info" component={App} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/algorithm" component={Algo} />
          <Route exact path="/office" component={Office} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/about" component={About}/>
          <Route exact path="/send-email-reset-password" component={ResetPass} />
          <Route exact path="/reset-password" component={NewPassword} />
          <Route exact path="/verify-user" component={VerifyUser} />
        </BrowserRouter>
        <Footer/>
      </CookiesProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

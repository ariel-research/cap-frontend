import React, {useState , createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Ranking from './components/Ranking/Ranking';
import Auth from './auth';
import { CookiesProvider } from "react-cookie";
import Office from './components/Office/Office'

function Router() {

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path="/" component={Auth}/>
          <Route exact path="/courses_info" component={App} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/office" component={Office} />
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

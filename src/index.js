import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import Ranking from './components/Ranking/Ranking';
import Results from './components/Results/results';
import Algo from './components/Office/algo';
import Office from './components/Office/Office'
import Auth from './auth';
import Reg from './register'
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

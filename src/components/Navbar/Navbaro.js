import React, {Component} from 'react'
import {MenuItems} from "./MenuItems"
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo1 from '.../../../public/logo.png';
import Cookies from 'js-cookie';

class Navbar extends Component {
    state = {
      clicked: false
    };
  
    handleClicked = () => {
      this.setState({ clicked: !this.state.clicked });
    };
  
    logoutUser = () => {
      Cookies.remove('mr-token');
      window.location.href = '/';
    };
  
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/home">
            <img src={logo1} alt="Logo" className="navbar-logo" />
            Fair Division
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.handleClicked}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${this.state.clicked ? 'show' : ''}`}>
            <ul className="navbar-nav ml-auto">
              {MenuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className={`nav-link ${this.props.active === item.title ? 'active' : ''}`}
                    to={item.url}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <i
                  className="fa-regular fa-arrow-right-from-bracket"
                  style={{ color: 'white', fontSize: '1.8rem', cursor: 'pointer' }}
                  onClick={this.logoutUser}
                ></i>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
  
  export default Navbar;
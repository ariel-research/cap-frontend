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
        <nav class="navbar navbar-expand-lg bg-primary ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/home">
      <img src={logo1} alt="Logo"/>
      חלוקה הוגנת
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
                  className="fas fa-sign-out-alt"
                  style={{ color: 'white', fontSize: '1.8rem', cursor: 'pointer' }}
                  onClick={this.logoutUser}
                ></i>
              </li>
      </ul>
    </div>
  </div>
</nav>
      );
    }
}
export default Navbar;
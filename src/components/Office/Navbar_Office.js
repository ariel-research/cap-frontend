import React, {Component } from 'react'
import {OfficeItems} from "./OfficeItems"
import './Navbar_Office.css'
//import {Navbar} from '.../Navbar/Navbar.css'
import {  BrowserRouter as Router, Link } from 'react-router-dom'



class NavbarOffice extends Component
{

    state = { clicked: false }
    handleClicked = () => this.setState({clicked: !this.state.clicked})

    render()
    {
        return(
            <Router>
                <div data-testid="nb_office">
                <nav className="NavbarItems">
                    <div className="menu-icon" onClick= {this.handleClicked}>
                        <i className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i>
                    </div>
                
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {OfficeItems.map((item, index)=>{
                                return (
                                    <li key={index}>
                                        <Link className={item.cName} to={item.url}>
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                    
                </nav>
            </div>
            </Router>
        )
    }
}

export default NavbarOffice
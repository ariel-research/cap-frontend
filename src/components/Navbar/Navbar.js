import React, {Component, useState, useEffect} from 'react'
import {MenuItems} from "./MenuItems"
import {OfficeItems} from "../Office/OfficeItems"
import './Navbar.css'
import { Link } from 'react-router-dom'

class Navbar extends Component
{

   //const [office, setOffice] = useState(null);
//    state = { clicked: false }
//     handleClicked = () => this.setState({clicked: !this.state.clicked})


    state = { clicked: false }
    handleClicked = () => this.setState({clicked: !this.state.clicked})

    render()
    {
        return(
            <nav className="NavbarItems" data-testid="nb">
                <h1 className="navbar-logo">
                    CAP
                    <i className="fab fa-react"></i>
                </h1>
                <div className="menu-icon" onClick= {this.handleClicked}>
                    <i className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i>
                </div>
               
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index)=>{
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
        )
    }
}

export default Navbar
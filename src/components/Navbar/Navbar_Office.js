import React, {Component , useState} from 'react'
import {OfficeItems} from "./OfficeItems"
import './Navbar_Office.css'
import './Navbar.css'
import { Link } from 'react-router-dom'



class Navbar extends Component
{

    state = { clicked: false }
    handleClicked = () => this.setState({clicked: !this.state.clicked})

    render()
    {
        return(
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
        )
    }
}

export default Navbar
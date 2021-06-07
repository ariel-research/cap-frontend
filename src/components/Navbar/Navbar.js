import React, {Component} from 'react'
import {MenuItems} from "./MenuItems"
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo1 from '.../../../public/logo.png';

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
                <div><img className="fab fa-react1" src={logo1} alt="" /></div>
                <div className="logo2">Fair Division</div>
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
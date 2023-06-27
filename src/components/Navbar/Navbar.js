import React, {Component} from 'react'
import {MenuItems} from "./MenuItems"
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo1 from '.../../../public/logo.png';
import Cookies from 'js-cookie';

class Navbar extends Component
{

   //const [office, setOffice] = useState(null);
//    state = { clicked: false }
//     handleClicked = () => this.setState({clicked: !this.state.clicked})

    state = { clicked: false }
    handleClicked = () => this.setState({clicked: !this.state.clicked})
    logoutUser = () => {
        Cookies.remove('mr-token');
        window.location.href = '/';
    }

    render()
    {
        return(
            <nav className="NavbarItems" data-testid="nb">
                <div><img className="fab fa-react1" src={logo1} alt="" /></div>
                <Link to='./home'><div className="logo2">Fair Division</div></Link>
                <div className="menu-icon" onClick= {this.handleClicked}>
                    <i className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i>
                </div>
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index)=>{
                            return (
                                <li key={index}>
                                    {this.props.active === item.title && 
                                    <Link className="active" to={item.url}>
                                        {item.title}
                                    </Link>}
                                    {this.props.active !== item.title && 
                                    <Link className={item.cName} to={item.url}>
                                        {item.title}
                                    </Link>}
                                </li>
                            )
                        })}
 
                    </ul>
                    <i style={{color:'white' ,fontSize:'3rem',marginTop:'1%', marginRight:'3%',position:'inherit',cursor:'pointer' }} className="fas fa-sign-out-alt" onClick={this.logoutUser}></i>
            </nav>
        )
    }
}

export default Navbar
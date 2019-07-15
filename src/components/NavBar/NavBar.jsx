import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
    let nav = props.user ?
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/' className='navbar-brand'>Quzzical</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to='/' className="nav-Link">Quiz's</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/create' className="nav-Link">Create Quiz</Link>
                </li>
                <li className="navbar-item">
                    <Link to='' className="nav-Link" onClick={props.handleLogout}>LOG OUT</Link>
                </li>
            </ul>
        </div>
    </nav>
    :
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className='navbar-brand'>Quzzical</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to='/login' className='NavBar-link'>LOG IN</Link>
                    </li>
                    <li>
                        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>                  
                    </li>
                </ul>
            </div>
        </nav>

        return (
            <div>
            {nav}
            </div>
        )
}

export default NavBar;


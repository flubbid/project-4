import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import { logout } from '../../store/actions';

class NavBar extends React.Component {
    render() {
        if (!this.props.user) {
            return (
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
            )
        }

        return (
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
                            <Link
                                to=''
                                className="nav-Link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.logout();
                                }}>LOG OUT</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logout })(NavBar);


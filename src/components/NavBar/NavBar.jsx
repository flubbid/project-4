import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import history from '../../utils/history';

class NavBar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to='/' className='navbar-brand'>Quzzical</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav w-100">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">Quiz's</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/create' className="nav-link">Create Quiz</Link>
                            </li>

                            {
                                !this.props.user
                                    ? (
                                        <li className="ml-auto">
                                            <ul className="d-flex flex-direction-row list-unstyled">
                                                <li className="nav-item">
                                                    <Link to='/login' className='nav-link'>LOG IN</Link>
                                                </li>
                                                <li>
                                                    <Link to='/signup' className='nav-link'>SIGN UP</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                    : (
                                        <a className="nav-link ml-auto" href="/logout" onClick={this.logout.bind(this)}>LOG OUT</a>
                                    )
                            }
                        </ul>
                    </div>
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

